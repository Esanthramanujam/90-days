import { useState } from 'react';
import { api } from '../api.js';
import { useAuth } from '../auth.jsx';
import { proteinTarget } from '../data/program.js';

export default function SettingsPage() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: user.name, weightKg: user.weightKg ?? '', heightCm: user.heightCm ?? '', goal: user.goal ?? '', startDate: user.startDate,
  });
  const [msg, setMsg] = useState('');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { user: u } = await api.updateMe(form);
      setUser(u);
      setMsg('Saved');
    } catch (err) { setMsg(err.message); }
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      <form className="card narrow" onSubmit={submit}>
        <label>Name<input value={form.name} onChange={set('name')} /></label>
        <p className="muted">Signed in as {user.email}</p>
        <div className="row2">
          <label>Weight (kg)<input type="number" step="0.1" value={form.weightKg} onChange={set('weightKg')} /></label>
          <label>Height (cm)<input type="number" value={form.heightCm} onChange={set('heightCm')} /></label>
        </div>
        {form.weightKg && <p className="muted">Daily protein target: <b>{proteinTarget(Number(form.weightKg))} g</b> (1.6 g/kg)</p>}
        <label>Main goal<input value={form.goal} onChange={set('goal')} /></label>
        <label>Program start date
          <input type="date" value={form.startDate} onChange={set('startDate')} />
        </label>
        <p className="muted small-text">Day 1 is your start date. Changing it moves which day counts as "today"; your saved logs stay attached to their day numbers.</p>
        <button className="primary">Save</button>
        {msg && <p className={msg === 'Saved' ? 'ok-text' : 'error'}>{msg}</p>}
      </form>
    </div>
  );
}
