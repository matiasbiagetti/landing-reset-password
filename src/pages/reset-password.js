import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;

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
      await axios.post('https://your-backend-url.com/api/reset-password', {
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
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          {/* Logo and App Name */}
          <img src="/assets/logo2.png" alt="SnapShare Logo" style={styles.logo} />
          <h1 style={styles.appName}>SnapShare</h1>
        </div>
        <h2 style={styles.title}>Reset Password</h2>

        {error && <p style={styles.errorText}>{error}</p>}
        {success ? (
          <div>
            <p style={styles.successText}>Password has been reset successfully!</p>
            <p style={styles.countdownText}>You can close this tab, or it will close automatically in {countdown} seconds.</p>
          </div>
        ) : (
          <form onSubmit={handlePasswordReset}>
            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>New Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="confirmPassword" style={styles.label}>Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.button}>Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

// Styles for the Reset Password page
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1e1e3f, #3d315b, #4d2c91)',
    color: '#fff',
  },
  formContainer: {
    maxWidth: '400px',
    width: '100%',
    backgroundColor: 'rgba(30, 30, 48, 0.85)',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
    textAlign: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logo: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginBottom: '10px',
  },
  appName: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#ffaf7b',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    fontWeight: 'bold',
    color: '#fff',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#ddd',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  button: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(90deg, #ff416c, #ff4b2b)',
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'opacity 0.3s ease',
  },
  errorText: {
    color: '#ff4b2b',
    marginBottom: '15px',
  },
  successText: {
    color: '#4caf50',
    marginBottom: '10px',
  },
  countdownText: {
    color: '#ddd',
  },
};

export default ResetPassword;
