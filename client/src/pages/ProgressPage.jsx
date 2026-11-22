import { useEffect, useState } from 'react';
import { api } from '../api.js';
import LineChart from '../components/LineChart.jsx';
import { scoreOf } from '../components/stats.js';

const FIELDS = [
  ['weightKg', 'Weight', ' kg'],
  ['waistCm', 'Waist', ' cm'],
  ['pushups', 'Max push-ups', ''],
  ['squatKg', 'Squat (best set)', ' kg'],
  ['benchKg', 'Bench (best set)', ' kg'],
];
const todayStr = () => new Date().toLocaleDateString('en-CA');
const short = (d) => new Date(d + 'T00:00').toLocaleDateString(undefined, { day: 'numeric', month: 'short' });

export default function ProgressPage() {
  const [metrics, setMetrics] = useState([]);
  const [checkins, setCheckins] = useState([]);
  const [form, setForm] = useState({ loggedOn: todayStr() });
  const [metric, setMetric] = useState('weightKg');
  const [error, setError] = useState('');

  useEffect(() => {
    api.metrics().then((d) => setMetrics(d.metrics));
    api.checkins().then((d) => setCheckins(d.checkins));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!FIELDS.some(([k]) => form[k] !== undefined && form[k] !== '')) return setError('Fill in at least one measurement');
    try {
      const { metric: m } = await api.addMetric(form);
      setMetrics([...metrics, m].sort((a, b) => a.loggedOn.localeCompare(b.loggedOn)));
      setForm({ loggedOn: todayStr() });
    } catch (err) { setError(err.message); }
  };
  const remove = async (id) => {
    await api.deleteMetric(id);
    setMetrics(metrics.filter((m) => m.id !== id));
  };

  const [, label, unit] = FIELDS.find(([k]) => k === metric);
  const sorted = [...checkins].sort((a, b) => a.day - b.day);

  return (
    <div className="progress">
      <h1>Progress</h1>
      <p className="muted">Measure once a week, same time of day (morning, after the bathroom, before food). Take photos on day 1, 30, 60 and 90 in the same light.</p>
      <div className="grid-2">
        <form className="card" onSubmit={submit}>
          <h2>Log measurements</h2>
          <label>Date<input type="date" value={form.loggedOn} onChange={(e) => setForm({ ...form, loggedOn: e.target.value })} /></label>
          <div className="row2">
            {FIELDS.map(([k, l, u]) => (
              <label key={k}>{l}{u && ` (${u.trim()})`}
                <input type="number" step="0.1" value={form[k] ?? ''} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
              </label>
            ))}
          </div>
          {error && <p className="error">{error}</p>}
          <button className="primary">Save entry</button>
        </form>

        <section className="card">
          <div className="card-title">
            <h2>{label}</h2>
            <select value={metric} onChange={(e) => setMetric(e.target.value)} className="compact">
              {FIELDS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
            </select>
          </div>
          <LineChart unit={unit} points={metrics.map((m) => ({ x: short(m.loggedOn), y: m[metric] }))} />
        </section>
      </div>

      <div className="grid-2">
        <section className="card">
          <h2>Confidence (self-rated)</h2>
          <LineChart unit="/10" points={sorted.map((c) => ({ x: `D${c.day}`, y: c.confidence }))} />
        </section>
        <section className="card">
          <h2>Protocol completion</h2>
          <LineChart unit="%" points={sorted.map((c) => ({ x: `D${c.day}`, y: Math.round(scoreOf(c) * 100) }))} />
        </section>
      </div>

      <section className="card">
        <h2>History</h2>
        {metrics.length === 0 ? <p className="muted">No entries yet.</p> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Date</th>{FIELDS.map(([k, l]) => <th key={k}>{l}</th>)}<th /></tr></thead>
              <tbody>
                {[...metrics].reverse().map((m) => (
                  <tr key={m.id}>
                    <td>{short(m.loggedOn)}</td>
                    {FIELDS.map(([k]) => <td key={k}>{m[k] ?? '—'}</td>)}
                    <td><button className="ghost small" onClick={() => remove(m.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
