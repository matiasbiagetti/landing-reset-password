import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import '../styles/globals.css';

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) return;
      try {
        await axios.post('https://backend-red-social-prod.vercel.app/api/auth/verify-email', {
          token,
        });
        setSuccess(true);
        setError('');
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to verify email');
      }
    };
    verifyEmail();
  }, [token]);

  return (
    <>
      <Head>
        <title>Verify Email</title>
      </Head>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#2C2B5E] to-[#48346B] p-6 font-inter">
        <div className="bg-[#1A1A2E] p-8 rounded-lg shadow-lg text-center w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <Image src="/logo2.png" alt="SnapShare Logo" width={80} height={80} className="mb-2" />
            <h1 className="text-2xl font-bold text-[#FF8C00]">SnapShare</h1>
          </div>
          <h2 className="text-xl font-semibold text-white mb-4">Verify Email</h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {success ? (
            <div className="text-green-500 text-sm mb-4">
              Email has been verified successfully! You may close this tab.
            </div>
          ) : (
            <div className="text-white text-sm mb-4">
              Verifying your email, please wait...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
