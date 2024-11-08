// pages/reset-password.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query; // Obtener el token desde los parámetros de la URL

  useEffect(() => {
    if (!token) return; // Esperar hasta que tengamos el token

    // Detectar si el usuario está en un dispositivo móvil
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Redirigir al esquema de enlace profundo si está en móvil
      const appLink = `exp://192.168.1.49:8081/--/reset-password?token=${token}`;
      window.location.href = appLink;

      // Opcional: Redirigir a la tienda de aplicaciones si la app no está instalada
      setTimeout(() => {
        window.location.href = 'https://youtube.com'; // Enlace a tu app en App Store o Google Play
      }, 2000);
    }
  }, [token]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Reset Your Password</h1>
      <p style={styles.message}>
        {token
          ? 'If you are on a mobile device, you will be redirected to the app. If you are on a desktop, please open this link on your mobile device.'
          : 'Loading...'}
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  },
  message: {
    color: '#666',
    fontSize: '16px',
  },
};
