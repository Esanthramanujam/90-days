import pg from 'pg';

// Return DATE columns as plain 'YYYY-MM-DD' strings (no timezone shifting).
pg.types.setTypeParser(1082, (v) => v);

import fs from 'node:fs';

// Read DATABASE_URL from the environment, or from a Render "Secret File" named DATABASE_URL.
function readDatabaseUrl() {
  if (process.env.DATABASE_URL?.trim()) return process.env.DATABASE_URL.trim();
  for (const f of ['/etc/secrets/DATABASE_URL', './DATABASE_URL']) {
    try {
      const v = fs.readFileSync(f, 'utf8').trim().replace(/^DATABASE_URL=/, '').replace(/^['"]|['"]$/g, '');
      if (v) return v;
    } catch {}
  }
  return '';
}
const url = readDatabaseUrl();
if (!url) {
  console.error('DATABASE_URL is not set. Copy .env.example to .env or set it in Render.');
  process.exit(1);
}

const isLocal = /localhost|127\.0\.0\.1/.test(url);
export const pool = new pg.Pool({
  connectionString: url,
  ssl: isLocal ? false : { rejectUnauthorized: false },
  max: 5,
  idleTimeoutMillis: 30000,
});

export const query = (text, params) => pool.query(text, params);

export async function migrate() {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      start_date DATE NOT NULL DEFAULT CURRENT_DATE,
      height_cm NUMERIC,
      weight_kg NUMERIC,
      goal TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS checkins (
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      day INTEGER NOT NULL CHECK (day BETWEEN 1 AND 90),
      habits JSONB NOT NULL DEFAULT '{}'::jsonb,
      mood SMALLINT,
      confidence SMALLINT,
      sleep_hours NUMERIC,
      notes TEXT,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      PRIMARY KEY (user_id, day)
    );
    CREATE TABLE IF NOT EXISTS metrics (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      logged_on DATE NOT NULL DEFAULT CURRENT_DATE,
      weight_kg NUMERIC,
      waist_cm NUMERIC,
      pushups INTEGER,
      squat_kg NUMERIC,
      bench_kg NUMERIC,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS metrics_user_idx ON metrics(user_id, logged_on);
  `);
}
