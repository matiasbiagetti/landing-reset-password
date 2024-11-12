import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the /reset-password route on component mount
    router.push('/reset-password');
  }, [router]);

  return (
    <>
      <Head>
        <title>Redirecting...</title>
      </Head>
      <div>
        <p>Redirecting to reset password...</p>
      </div>
    </>
  );
}
