import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import { query, migrate } from './db.js';
import { setSession, clearSession, requireAuth } from './auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false });

const publicUser = (u) => ({
  id: u.id,
  email: u.email,
  name: u.name,
  startDate: u.start_date instanceof Date ? u.start_date.toISOString().slice(0, 10) : u.start_date,
  heightCm: u.height_cm === null ? null : Number(u.height_cm),
  weightKg: u.weight_kg === null ? null : Number(u.weight_kg),
  goal: u.goal,
});

const num = (v) => (v === '' || v === null || v === undefined || Number.isNaN(Number(v)) ? null : Number(v));
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// ---------- Auth ----------
app.post('/api/auth/signup', authLimiter, wrap(async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  const name = String(req.body.name || '').trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'Enter a valid email' });
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });
  if (!name) return res.status(400).json({ error: 'Enter your name' });

  const exists = await query('SELECT 1 FROM users WHERE email = $1', [email]);
  if (exists.rowCount) return res.status(409).json({ error: 'An account with this email already exists' });

  const hash = await bcrypt.hash(password, 12);
  const { rows } = await query(
    `INSERT INTO users (email, password_hash, name, height_cm, weight_kg, goal, start_date)
     VALUES ($1,$2,$3,$4,$5,$6, COALESCE($7::date, CURRENT_DATE)) RETURNING *`,
    [email, hash, name, num(req.body.heightCm), num(req.body.weightKg), req.body.goal || null,
     /^\d{4}-\d{2}-\d{2}$/.test(req.body.startDate || '') ? req.body.startDate : null]
  );
  setSession(res, rows[0].id);
  res.status(201).json({ user: publicUser(rows[0]) });
}));

app.post('/api/auth/login', authLimiter, wrap(async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  const { rows } = await query('SELECT * FROM users WHERE email = $1', [email]);
  const user = rows[0];
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: 'Wrong email or password' });
  }
  setSession(res, user.id);
  res.json({ user: publicUser(user) });
}));

app.post('/api/auth/logout', (_req, res) => {
  clearSession(res);
  res.json({ ok: true });
});

app.get('/api/me', requireAuth, wrap(async (req, res) => {
  const { rows } = await query('SELECT * FROM users WHERE id = $1', [req.userId]);
  if (!rows[0]) return res.status(401).json({ error: 'Not signed in' });
  res.json({ user: publicUser(rows[0]) });
}));

app.patch('/api/me', requireAuth, wrap(async (req, res) => {
  const { name, heightCm, weightKg, goal, startDate } = req.body;
  const { rows } = await query(
    `UPDATE users SET
       name = COALESCE($2, name),
       height_cm = COALESCE($3, height_cm),
       weight_kg = COALESCE($4, weight_kg),
       goal = COALESCE($5, goal),
       start_date = COALESCE($6::date, start_date)
     WHERE id = $1 RETURNING *`,
    [req.userId, name || null, num(heightCm), num(weightKg), goal || null,
     /^\d{4}-\d{2}-\d{2}$/.test(startDate || '') ? startDate : null]
  );
  res.json({ user: publicUser(rows[0]) });
}));

// ---------- Daily check-ins ----------
const mapCheckin = (r) => ({
  day: r.day,
  habits: r.habits,
  mood: r.mood,
  confidence: r.confidence,
  sleepHours: r.sleep_hours === null ? null : Number(r.sleep_hours),
  notes: r.notes,
  updatedAt: r.updated_at,
});

app.get('/api/checkins', requireAuth, wrap(async (req, res) => {
  const { rows } = await query('SELECT * FROM checkins WHERE user_id = $1 ORDER BY day', [req.userId]);
  res.json({ checkins: rows.map(mapCheckin) });
}));

app.put('/api/checkins/:day', requireAuth, wrap(async (req, res) => {
  const day = Number(req.params.day);
  if (!Number.isInteger(day) || day < 1 || day > 90) return res.status(400).json({ error: 'Day must be 1–90' });
  const habits = typeof req.body.habits === 'object' && req.body.habits ? req.body.habits : {};
  const clamp = (v) => (num(v) === null ? null : Math.max(1, Math.min(10, Math.round(num(v)))));
  const { rows } = await query(
    `INSERT INTO checkins (user_id, day, habits, mood, confidence, sleep_hours, notes, updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7, now())
     ON CONFLICT (user_id, day) DO UPDATE SET
       habits = EXCLUDED.habits, mood = EXCLUDED.mood, confidence = EXCLUDED.confidence,
       sleep_hours = EXCLUDED.sleep_hours, notes = EXCLUDED.notes, updated_at = now()
     RETURNING *`,
    [req.userId, day, JSON.stringify(habits), clamp(req.body.mood), clamp(req.body.confidence),
     num(req.body.sleepHours), req.body.notes ? String(req.body.notes).slice(0, 4000) : null]
  );
  res.json({ checkin: mapCheckin(rows[0]) });
}));

// ---------- Body / strength metrics ----------
const mapMetric = (r) => ({
  id: r.id,
  loggedOn: r.logged_on instanceof Date ? r.logged_on.toISOString().slice(0, 10) : r.logged_on,
  weightKg: r.weight_kg === null ? null : Number(r.weight_kg),
  waistCm: r.waist_cm === null ? null : Number(r.waist_cm),
  pushups: r.pushups,
  squatKg: r.squat_kg === null ? null : Number(r.squat_kg),
  benchKg: r.bench_kg === null ? null : Number(r.bench_kg),
});

app.get('/api/metrics', requireAuth, wrap(async (req, res) => {
  const { rows } = await query('SELECT * FROM metrics WHERE user_id = $1 ORDER BY logged_on, id', [req.userId]);
  res.json({ metrics: rows.map(mapMetric) });
}));

app.post('/api/metrics', requireAuth, wrap(async (req, res) => {
  const b = req.body;
  const date = /^\d{4}-\d{2}-\d{2}$/.test(b.loggedOn || '') ? b.loggedOn : null;
  const { rows } = await query(
    `INSERT INTO metrics (user_id, logged_on, weight_kg, waist_cm, pushups, squat_kg, bench_kg)
     VALUES ($1, COALESCE($2::date, CURRENT_DATE), $3,$4,$5,$6,$7) RETURNING *`,
    [req.userId, date, num(b.weightKg), num(b.waistCm), num(b.pushups), num(b.squatKg), num(b.benchKg)]
  );
  res.status(201).json({ metric: mapMetric(rows[0]) });
}));

app.delete('/api/metrics/:id', requireAuth, wrap(async (req, res) => {
  await query('DELETE FROM metrics WHERE id = $1 AND user_id = $2', [Number(req.params.id), req.userId]);
  res.json({ ok: true });
}));

app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

// ---------- Static React build ----------
const dist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist, { maxAge: '1h', index: false }));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

const port = process.env.PORT || 3000;
migrate()
  .then(() => app.listen(port, () => console.log(`Reforge 90 running on :${port}`)))
  .catch((e) => {
    console.error('Database migration failed:', e.message);
    process.exit(1);
  });
