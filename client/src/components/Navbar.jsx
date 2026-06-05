import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="taskbar">
      <span className="y2k-brand">★ CLUELESS CLOSET</span>

      <button
        className={`tab${pathname === '/closet' ? ' active' : ''}`}
        onClick={() => navigate('/closet')}
      >
        My Closet
      </button>
      <button
        className={`tab${pathname === '/outfits' ? ' active' : ''}`}
        onClick={() => navigate('/outfits')}
      >
        Saved Outfits
      </button>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, color: 'var(--dark-shadow)' }}>{user?.email}</span>
        <button className="win-btn" onClick={handleLogout} style={{ minWidth: 'unset', padding: '2px 10px' }}>
          Logout
        </button>
      </div>
    </nav>
  );
}
