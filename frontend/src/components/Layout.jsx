import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Layout() {
  const { user, logout } = useAuth(); const navigate = useNavigate();
  return <><nav className="navbar navbar-expand-lg navbar-dark topbar"><div className="container">
    <Link className="navbar-brand fw-bold" to="/">🧮 MathMaster</Link>
    <div className="d-flex align-items-center gap-3 flex-wrap">
      {user && <><NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
        {user.role === 'admin' ? <NavLink className="nav-link" to="/admin">Admin</NavLink> : <>
          <NavLink className="nav-link" to="/history">History</NavLink><NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink></>}
        <span className="text-white-50 small">{user.name}</span>
        <button className="btn btn-sm btn-light" onClick={() => { logout(); navigate('/login'); }}>Logout</button></>}
      {!user && <><Link className="nav-link" to="/login">Login</Link><Link className="btn btn-light btn-sm" to="/register">Register</Link></>}
    </div></div></nav><main className="container py-4"><Outlet /></main><footer className="text-center py-4 text-muted small">MathMaster · Practice makes progress</footer></>;
}
