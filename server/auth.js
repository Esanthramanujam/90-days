import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dev-only-secret-change-me';
if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  console.error('JWT_SECRET must be set in production');
  process.exit(1);
}

export const COOKIE = 'r90_session';
const MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days

export function setSession(res, userId) {
  const token = jwt.sign({ sub: userId }, SECRET, { expiresIn: '30d' });
  res.cookie(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: MAX_AGE,
  });
}

export function clearSession(res) {
  res.clearCookie(COOKIE);
}

export function requireAuth(req, res, next) {
  const token = req.cookies?.[COOKIE];
  if (!token) return res.status(401).json({ error: 'Not signed in' });
  try {
    req.userId = jwt.verify(token, SECRET).sub;
    next();
  } catch {
    clearSession(res);
    res.status(401).json({ error: 'Session expired' });
  }
}
