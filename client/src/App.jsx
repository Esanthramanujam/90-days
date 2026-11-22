import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { useAuth } from './auth.jsx';
import AuthPage from './pages/AuthPage.jsx';
import DayPage from './pages/DayPage.jsx';
import PlanPage from './pages/PlanPage.jsx';
import ProgressPage from './pages/ProgressPage.jsx';
import SciencePage from './pages/SciencePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

function Shell({ children }) {
  const { user, logout } = useAuth();
  const links = [
    ['/today', 'Today'],
    ['/plan', '90-Day Plan'],
    ['/progress', 'Progress'],
    ['/science', 'Science'],
    ['/settings', 'Settings'],
  ];
  return (
    <div className="shell">
      <header className="topbar">
        <NavLink to="/today" className="brand">REFORGE<span>90</span></NavLink>
        <nav>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active' : '')}>{label}</NavLink>
          ))}
        </nav>
        <div className="who">
          <span>{user.name.split(' ')[0]}</span>
          <button className="ghost small" onClick={logout}>Log out</button>
        </div>
      </header>
      <main>{children}</main>
      <footer className="foot">
        Educational content based on published research and Huberman Lab protocols — not medical advice. Check with a doctor before starting a new training, diet or supplement plan.
      </footer>
    </div>
  );
}

export default function App() {
  const { user, loading } = useAuth();
  if (loading) return <div className="splash">REFORGE<span>90</span></div>;
  if (!user) {
    return (
      <Routes>
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="*" element={<AuthPage mode="login" />} />
      </Routes>
    );
  }
  return (
    <Shell>
      <Routes>
        <Route path="/today" element={<DayPage />} />
        <Route path="/day/:n" element={<DayPage />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/science" element={<SciencePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/today" replace />} />
      </Routes>
    </Shell>
  );
}
