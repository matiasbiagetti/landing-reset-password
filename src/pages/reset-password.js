import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query; // Extract the token from the URL query parameter

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(30);

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
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to reset password');
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.close();
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
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
