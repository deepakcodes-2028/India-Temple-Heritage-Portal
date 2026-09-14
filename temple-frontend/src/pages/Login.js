import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserShield, FaLock, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import api from '../services/api';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', {
        email,
        password,
      });

      if (res.data.role !== 'admin') {
        setError('Access denied: Administrator privileges required.');
        setLoading(false);
        return;
      }

      login(res.data, res.data.token);
      navigate('/admin');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login failed. Please check your admin credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header-icon">
          <FaUserShield />
        </div>
        <h2>Admin Portal</h2>
        <p className="auth-subtitle">
          Sign in to manage temples, festivals, and pilgrimage circuits
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="admin-email">
              <FaEnvelope className="field-icon" /> Administrator Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@templeyatra.org"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="admin-password">
              <FaLock className="field-icon" /> Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter admin password"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In as Administrator'}
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/" className="back-link">
            <FaArrowLeft /> Return to Public Portal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

