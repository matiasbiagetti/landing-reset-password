import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const location = useLocation();
  
  // Extract the token from query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    // Validate that the passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send request to backend
      const response = await axios.post('https://your-backend-url.com/api/reset-password', {
        token: token,
        newPassword: password,
      });

      // Handle successful response
      setSuccess(true);
      setError('');
    } catch (error) {
      // Handle errors
      setError(error.response?.data?.message || 'Failed to reset password');
    }
  };

  // Start countdown and close the tab if success is true
  useEffect(() => {
    if (success) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            window.close(); // Close the tab
          }
          return prevCountdown - 1;
        });
      }, 1000);
      return () => clearInterval(timer); // Cleanup timer on unmount
    }
  }, [success]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <form onSubmit={handlePasswordReset} style={{ maxWidth: '400px', width: '100%' }}>
        <h2>Reset Password</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {success ? (
          <div>
            <p style={{ color: 'green' }}>Password has been reset successfully!</p>
            <p>You can close this tab, or it will close automatically in {countdown} seconds.</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="password">New Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="confirmPassword">Confirm New Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>

            <button type="submit" style={{ padding: '10px 15px', width: '100%' }}>Reset Password</button>
          </>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
