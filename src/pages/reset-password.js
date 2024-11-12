import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.png'; 
import '../ResetPassword.css'; 

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://your-backend-url.com/api/reset-password', {
        token,
        newPassword: password,
      });
      setSuccess(true);
      setError('');
      alert('Password reset successfully!');
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className="reset-container">
      <form className="reset-form" onSubmit={handlePasswordReset}>
        <div className="logo-container">
          <img src={logo} alt="SnapShare Logo" className="logo" />
          <h1 className="app-name">SnapShare</h1>
        </div>
        <h2 className="title">Reset Password</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">Password has been reset successfully!</p>}

        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <button type="submit" className="reset-button">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
