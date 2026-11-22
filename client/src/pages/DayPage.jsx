import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../auth.jsx';
import { CONFIDENCE_REPS, HABITS, PILLARS, SCIENCE, currentDay, dateForDay, phaseForDay, proteinTarget, workoutForDay } from '../data/program.js';
import Ring from '../components/Ring.jsx';
import { scoreOf, streak } from '../components/stats.js';

const empty = { habits: {}, mood: 6, confidence: 5, sleepHours: '', notes: '' };

export default function DayPage() {
  const { user } = useAuth();
  const params = useParams();
  const today = currentDay(user.startDate);
  const day = params.n ? Math.max(1, Math.min(90, Number(params.n) || 1)) : today;
  const phase = phaseForDay(day);
  const workout = workoutForDay(day);
  const rep = CONFIDENCE_REPS[day - 1];

  const [all, setAll] = useState([]);
  const [entry, setEntry] = useState(empty);
  const [status, setStatus] = useState('');
  const [open, setOpen] = useState(null);
  const timer = useRef();

  useEffect(() => {
    api.checkins().then(({ checkins }) => {
      setAll(checkins);
      const c = checkins.find((x) => x.day === day);
      setEntry(c ? { ...empty, ...c, sleepHours: c.sleepHours ?? '', notes: c.notes ?? '' } : empty);
    });
  }, [day]);

  const save = (next) => {
    setEntry(next);
    setStatus('Saving…');
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      try {
        const { checkin } = await api.saveCheckin(day, next);
        setAll((prev) => [...prev.filter((x) => x.day !== day), checkin]);
        setStatus('Saved');
      } catch (e) {
        setStatus(e.message);
      }
    }, 400);
  };

  const toggle = (id) => save({ ...entry, habits: { ...entry.habits, [id]: !entry.habits[id] } });
  const score = scoreOf(entry);
  const done = HABITS.filter((h) => entry.habits[h.id]).length;
  const s = useMemo(() => streak(all, today), [all, today]);
  const daysLogged = all.filter((c) => scoreOf(c) > 0).length;
  const protein = proteinTarget(user.weightKg);

  return (
    <div className="day">
      <section className="day-head card">
        <div>
          <p className="eyebrow">Phase {phase.id} · {phase.name} · {dateForDay(user.startDate, day)}</p>
          <h1>Day {day}<span className="of"> / 90</span></h1>
          <p className="muted">{phase.tagline}</p>
          <div className="day-nav">
            {day > 1 && <Link className="ghost small" to={`/day/${day - 1}`}>← Day {day - 1}</Link>}
            {day !== today && <Link className="ghost small" to="/today">Back to today</Link>}
            {day < 90 && <Link className="ghost small" to={`/day/${day + 1}`}>Day {day + 1} →</Link>}
          </div>
        </div>
        <div className="head-stats">
          <Ring value={score} label={`${Math.round(score * 100)}%`} sub={`${done}/${HABITS.length} done`} />
          <div className="mini">
            <div><b>{s}</b><small>day streak</small></div>
            <div><b>{daysLogged}</b><small>days logged</small></div>
            <div><b>{Math.round((day / 90) * 100)}%</b><small>of program</small></div>
          </div>
        </div>
      </section>

      <div className="grid-2">
        <section className="card">
          <div className="card-title">
            <h2>Daily protocol</h2>
            <span className={`save ${status === 'Saved' ? 'ok' : ''}`}>{status}</span>
          </div>
          {PILLARS.map((p) => (
            <div key={p} className="pillar-group">
              <h3 className={`tag tag-${p.toLowerCase()}`}>{p}</h3>
              {HABITS.filter((h) => h.pillar === p).map((h) => (
                <div key={h.id} className={`habit ${entry.habits[h.id] ? 'on' : ''}`}>
                  <button className="check" onClick={() => toggle(h.id)} aria-pressed={!!entry.habits[h.id]} aria-label={h.label}>
                    {entry.habits[h.id] ? '✓' : ''}
                  </button>
                  <div className="habit-body">
                    <button className="habit-label" onClick={() => setOpen(open === h.id ? null : h.id)}>
                      {h.label}
                      {h.id === 'protein' && protein ? <em> · {protein} g</em> : null}
                      <span className="chev">{open === h.id ? '−' : '+'}</span>
                    </button>
                    {open === h.id && (
                      <div className="habit-detail">
                        <p>{h.detail}</p>
                        <Link to={`/science#${h.science}`} className="why">Why: {SCIENCE[h.science].title} · {SCIENCE[h.science].evidence} evidence →</Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>

        <div className="stack">
          <section className="card rep">
            <p className="eyebrow">Confidence rep · day {day}</p>
            <h2 className="rep-text">{rep}</h2>
            <button className={entry.habits.rep ? 'primary' : 'outline'} onClick={() => toggle('rep')}>
              {entry.habits.rep ? 'Done — nice work' : 'Mark as done'}
            </button>
          </section>

          <section className="card">
            <div className="card-title">
              <h2>{workout.title}</h2>
              {workout.isLift && <span className="pill">Lift</span>}
            </div>
            <ul className="exercises">
              {workout.exercises.map(([name, sets]) => (
                <li key={name}><span>{name}</span><b>{sets}</b></li>
              ))}
            </ul>
            {workout.note && <p className="muted small-text">{workout.note}</p>}
          </section>

          <section className="card">
            <h2>Reflection</h2>
            <label className="slider">Mood <b>{entry.mood ?? '–'}/10</b>
              <input type="range" min="1" max="10" value={entry.mood ?? 5} onChange={(e) => save({ ...entry, mood: Number(e.target.value) })} />
            </label>
            <label className="slider">Confidence <b>{entry.confidence ?? '–'}/10</b>
              <input type="range" min="1" max="10" value={entry.confidence ?? 5} onChange={(e) => save({ ...entry, confidence: Number(e.target.value) })} />
            </label>
            <label>Hours slept
              <input type="number" step="0.25" min="0" max="16" value={entry.sleepHours} onChange={(e) => save({ ...entry, sleepHours: e.target.value })} placeholder="7.5" />
            </label>
            <label>Notes — what scared you, what went well?
              <textarea rows="4" value={entry.notes} onChange={(e) => save({ ...entry, notes: e.target.value })} />
            </label>
          </section>
        </div>
      </div>
    </div>
  );
}
