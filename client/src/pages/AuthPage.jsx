import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth.jsx';

export default function AuthPage({ mode }) {
  const isSignup = mode === 'signup';
  const { login, signup } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', weightKg: '', heightCm: '', goal: 'Build muscle & confidence' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (isSignup) await signup({ ...form, startDate: new Date().toLocaleDateString('en-CA') });
      else await login({ email: form.email, password: form.password });
      nav('/today');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth">
      <section className="auth-hero">
        <div className="brand big">REFORGE<span>90</span></div>
        <h1>90 days. One new version of you.</h1>
        <p>A daily protocol for muscle, looks and confidence — built on peer-reviewed research and Huberman Lab toolkits, with every habit linked to its evidence.</p>
        <ul className="pillars">
          <li><b>Body</b> Progressive strength training, protein, steps</li>
          <li><b>Look</b> SPF, retinoids, grooming, posture</li>
          <li><b>Mind</b> Morning light, sleep, breathwork</li>
          <li><b>Confidence</b> 90 graded social reps, easy → hard</li>
        </ul>
      </section>
      <form className="card auth-card" onSubmit={submit}>
        <h2>{isSignup ? 'Create your account' : 'Welcome back'}</h2>
        {isSignup && (
          <label>Name<input value={form.name} onChange={set('name')} required autoComplete="name" /></label>
        )}
        <label>Email<input type="email" value={form.email} onChange={set('email')} required autoComplete="email" /></label>
        <label>Password<input type="password" value={form.password} onChange={set('password')} required minLength={isSignup ? 8 : undefined} autoComplete={isSignup ? 'new-password' : 'current-password'} /></label>
        {isSignup && (
          <>
            <div className="row2">
              <label>Weight (kg)<input type="number" step="0.1" value={form.weightKg} onChange={set('weightKg')} placeholder="70" /></label>
              <label>Height (cm)<input type="number" value={form.heightCm} onChange={set('heightCm')} placeholder="175" /></label>
            </div>
            <label>Main goal
              <select value={form.goal} onChange={set('goal')}>
                <option>Build muscle & confidence</option>
                <option>Lose fat & look sharper</option>
                <option>Social confidence first</option>
                <option>All-round reset</option>
              </select>
            </label>
          </>
        )}
        {error && <p className="error">{error}</p>}
        <button className="primary" disabled={busy}>{busy ? 'Please wait…' : isSignup ? 'Start day 1' : 'Log in'}</button>
        <p className="muted center">
          {isSignup ? <>Already have an account? <Link to="/login">Log in</Link></> : <>New here? <Link to="/signup">Create an account</Link></>}
        </p>
      </form>
    </div>
  );
}
