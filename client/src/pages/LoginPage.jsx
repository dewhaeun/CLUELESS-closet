import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import WindowFrame from '../components/WindowFrame';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/closet');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div style={{ textAlign: 'center' }}>
        <h1 className="y2k-title" style={{ fontSize: 72, marginBottom: 8 }}>
          ★ clueless
        </h1>
        <h1 className="y2k-title" style={{ fontSize: 72, marginBottom: 32 }}>
          closet
        </h1>

        <WindowFrame title="Sign In" width={320}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div className="form-group">
              <label>Email</label>
              <input
                className="win-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="win-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-msg">{error}</p>}

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
              <button
                className="win-btn win-btn-primary"
                type="submit"
                disabled={loading}
                style={{ minWidth: 120 }}
              >
                {loading ? 'Signing in...' : 'Log In'}
              </button>
            </div>

            <p style={{ textAlign: 'center', fontSize: 11, marginTop: 16, color: 'var(--dark-shadow)' }}>
              No account?{' '}
              <Link to="/signup" style={{ color: 'var(--blue)' }}>Sign up →</Link>
            </p>
          </form>
        </WindowFrame>
      </div>
    </div>
  );
}
