# Reforge 90

A science-based 90-day transformation tracker for **muscle, looks, sleep and confidence**, built with React (Vite), Express and Neon Postgres. Every user has their own account and data.

## What's inside
- **Today**: day N/90, an 11-habit daily protocol across Body / Look / Mind / Confidence, today's workout, today's confidence rep, and a mood/confidence/sleep reflection (auto-saves).
- **90-Day Plan**: 3 phases (Foundation → Build → Peak), a heatmap of completion, full-body to upper/lower progression, and a deload in days 57–63.
- **Progress**: weight, waist, push-ups, squat and bench log with trend charts, plus confidence and completion trends.
- **Science**: every protocol with an honest evidence rating and links to the studies (Morton 2018, Schoenfeld 2017, Balban 2023, Hughes 2013, Paluch 2022 …) and Huberman Lab toolkits.
- **Auth**: email + password (bcrypt), httpOnly JWT cookie, rate-limited login.

## Run locally
```bash
cp .env.example .env            # put your Neon DATABASE_URL in it
npm install && npm run build
node --env-file=.env server/index.js   # http://localhost:3000
```
For hot reload: `node --env-file=.env --watch server/index.js` in one terminal and `npm run dev:client` in another (Vite proxies `/api`).

Tables are created automatically on first start.

## Deploy on Render
1. Create a Neon project → **Connect** → copy the connection string.
2. Render → **New → Blueprint** → pick this repo. `render.yaml` creates the web service and generates `JWT_SECRET`.
3. Paste the Neon string into `DATABASE_URL` when Render asks, then **Apply**.

> Educational content, not medical advice.
