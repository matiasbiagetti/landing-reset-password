import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image'; 
import Head from 'next/head'; 
import logo from '../public/logo2.png';
import '../styles/globals.css';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.close(); // Close the tab after 30 seconds
      }, 30000);

      return () => clearTimeout(timer); // Clear timer if the component unmounts
    }
  }, [success]);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push('La contraseña debe tener al menos 8 caracteres.');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('La contraseña debe contener al menos una letra mayúscula.');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('La contraseña debe contener al menos un número.');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('La contraseña debe contener al menos un carácter especial.');
    }
    return errors;
  };

  useEffect(() => {
    setPasswordErrors(validatePassword(password));
  }, [password]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (passwordErrors.length > 0) {
      setError(passwordErrors.join('\n'));
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('https://backend-red-social-prod.vercel.app/api/auth/reset-password', {
        token,
        password,
      });
      setSuccess(true);
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#2C2B5E] to-[#48346B] p-6 font-inter">
        <form
          onSubmit={handlePasswordReset}
          className="bg-[#1A1A2E] p-8 rounded-lg shadow-lg text-center w-full max-w-md"
        >
          <div className="flex flex-col items-center mb-6">
            <Image src={logo} alt="SnapShare Logo" width={80} height={80} className="mb-2" />
            <h1 className="text-2xl font-bold text-[#FF8C00]">SnapShare</h1>
          </div>
          <h2 className="text-xl font-semibold text-white mb-4">Reset Password</h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {success ? (
            <div className="text-green-500 text-sm mb-4">
              Password has been reset successfully! You may close this tab, or it will close automatically in 30 seconds.
            </div>
          ) : (
            <>
              <div className="mb-4 text-left relative">
                <label htmlFor="password" className="text-white font-medium">New Password:</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 mt-2 rounded-md bg-[#333] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 10, bottom: 10 }}>
                  {showPassword ? <IoEyeOffOutline size={24} color="#999" /> : <IoEyeOutline size={24} color="#999" />}
                </button>
                {passwordErrors.length > 0 && (
                  <div className="text-red-500 text-sm mt-2">
                    {passwordErrors.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-6 text-left relative">
                <label htmlFor="confirmPassword" className="text-white font-medium">Confirm New Password:</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full p-3 mt-2 rounded-md bg-[#333] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: 10, bottom: 10 }}>
                  {showConfirmPassword ? <IoEyeOffOutline size={24} color="#999" /> : <IoEyeOutline size={24} color="#999" />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] text-white font-bold rounded-md hover:bg-gradient-to-r hover:from-[#FF4B2B] hover:to-[#FF416C] transition-all duration-300"
              >
                Reset Password
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default ResetPassword;