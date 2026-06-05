import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import WindowFrame from '../components/WindowFrame';

export default function SignupPage() {
  const { signup } = useAuth();
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
      await signup(email, password);
      navigate('/closet');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
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

        <WindowFrame title="Create Account" width={320}>
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
              <label>
                Password{' '}
                <span style={{ fontWeight: 'normal', color: 'var(--shadow)' }}>(min 6 chars)</span>
              </label>
              <input
                className="win-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
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
                {loading ? 'Creating...' : 'Sign Up'}
              </button>
            </div>

            <p style={{ textAlign: 'center', fontSize: 11, marginTop: 16, color: 'var(--dark-shadow)' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--blue)' }}>Log in →</Link>
            </p>
          </form>
        </WindowFrame>
      </div>
    </div>
  );
}
