import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../auth.jsx';
import { PHASES, currentDay, workoutForDay } from '../data/program.js';
import { scoreOf } from '../components/stats.js';

export default function PlanPage() {
  const { user } = useAuth();
  const today = currentDay(user.startDate);
  const [byDay, setByDay] = useState(new Map());
  useEffect(() => {
    api.checkins().then(({ checkins }) => setByDay(new Map(checkins.map((c) => [c.day, c]))));
  }, []);

  return (
    <div className="plan">
      <h1>Your 90-day plan</h1>
      <p className="muted">Three 30-day phases. Each square is a day; colour shows how much of the protocol you completed.</p>
      {PHASES.map((p) => {
        const days = Array.from({ length: p.days[1] - p.days[0] + 1 }, (_, i) => p.days[0] + i);
        const avg = days.reduce((a, d) => a + scoreOf(byDay.get(d)), 0) / days.length;
        return (
          <section key={p.id} className="card phase">
            <div className="phase-head">
              <div>
                <p className="eyebrow">Phase {p.id} · Days {p.days[0]}–{p.days[1]}</p>
                <h2>{p.name}</h2>
                <p className="muted">{p.tagline}</p>
              </div>
              <div className="phase-score"><b>{Math.round(avg * 100)}%</b><small>completion</small></div>
            </div>
            <ul className="focus">{p.focus.map((f) => <li key={f}>{f}</li>)}</ul>
            <div className="days-grid">
              {days.map((d) => {
                const sc = scoreOf(byDay.get(d));
                const w = workoutForDay(d);
                return (
                  <Link key={d} to={`/day/${d}`} title={`Day ${d}: ${w.title} · ${Math.round(sc * 100)}%`}
                    className={`cell ${d === today ? 'today' : ''} ${d > today ? 'future' : ''}`}
                    style={{ '--fill': sc }}>
                    <span>{d}</span>
                    <small>{w.isLift ? '●' : ''}</small>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
      <p className="muted small-text">● = lifting day. Days 57–63 are a deload week.</p>
    </div>
  );
}
