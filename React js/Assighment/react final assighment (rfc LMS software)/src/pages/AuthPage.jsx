import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signin, signup, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signin(email, password);
      } else {
        if (!fullName.trim()) {
          setError('Full name is required');
          setLoading(false);
          return;
        }
        await signup(email, password, fullName);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side - Form */}
      <div className="auth-left">
        <div className="auth-form-wrapper">
          <div className="auth-header">
            <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p>{isLogin ? 'Sign in to your account' : 'Join our learning platform'}</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            type="button"
            className="btn-google"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.745 12.27c0-.79-.1-1.54-.25-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.85c2.27-2.09 3.57-5.17 3.57-8.82z" fill="#4285F4"/>
              <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.85-3c-1.08.72-2.45 1.13-4.08 1.13-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.05 21.3 7.31 24 12 24z" fill="#34A853"/>
              <path d="M5.27 14.26c-.22-.72-.35-1.49-.35-2.26s.13-1.54.35-2.26V7.07H1.29C.56 8.55 0 10.22 0 12s.56 3.45 1.29 4.93l3.98-3.67z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.92 2.04 15.24 1 12 1 7.31 1 3.05 3.71 1.29 7.07l3.98 3.09c.95-2.85 3.6-4.78 6.73-4.78z" fill="#EA4335"/>
            </svg>
            {loading ? 'Processing...' : 'Continue with Google'}
          </button>

          <p className="auth-toggle">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setEmail('');
                setPassword('');
                setFullName('');
              }}
              className="toggle-btn"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Gradient */}
      <div className="auth-right">
        <div className="gradient-content">
          <h2>{isLogin ? 'New to LMS?' : 'Welcome to'} LMS Platform</h2>
          <p>
            {isLogin
              ? 'Join thousands of students learning and growing their skills'
              : 'Your gateway to quality education and personal growth'}
          </p>
          <div className="features">
            <div className="feature-item">
              <div className="feature-icon">📚</div>
              <span>Comprehensive Courses</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">👥</div>
              <span>Expert Instructors</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎓</div>
              <span>Certifications</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
