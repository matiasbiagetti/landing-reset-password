import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import logo from '../assets/logo2.png'; 
import styles from '../styles/ResetPassword.module.css'; 
import "../styles/globals.css";

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query; // Extract the token from query parameters

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing token');
    }
  }, [token]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://backend-red-social-prod.vercel.app/api/auth/reset-password', {
        token,
        newPassword: password,
      });
      setSuccess(true);
      setError('');
      alert('Password reset successfully!');
      router.push('/login'); // Redirect to the login page
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className={styles.resetContainer}>
      <form className={styles.resetForm} onSubmit={handlePasswordReset}>
        <div className={styles.logoContainer}>
          <img src={logo.src} alt="SnapShare Logo" className={styles.logo} />
          <h1 className={styles.appName}>SnapShare</h1>
        </div>
        <h2 className={styles.title}>Reset Password</h2>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>Password has been reset successfully!</p>}

        <div className={styles.formGroup}>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.inputField}
            disabled={!token}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.inputField}
            disabled={!password || !token}
          />
        </div>

        <button type="submit" className={styles.resetButton}>Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
