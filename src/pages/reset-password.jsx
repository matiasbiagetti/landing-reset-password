import React, { useState, useEffect } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import '../styles/globals.css';
import { Alert } from 'react-native';

const ResetPassword = ({navigation}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
  };w

  const handleChangePassword = async () => {
    const passwordErrors = validatePassword(newPassword);
    if (passwordErrors.length > 0) {
      setError(passwordErrors.join('\n'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas nuevas no coinciden');
      return;
    }

    try {
      const response = await changePassword(currentPassword, newPassword);
      console.log('API Response:', response); // Log the response for debugging

      if (response.message === 'Password changed successfully') {
        Alert.alert('Éxito', 'Contraseña cambiada correctamente');
        navigation.goBack();
      } else {
        console.error('Error response:', response); // Log the error response for debugging
        if (response.error === 'Incorrect old password') {
          setError('La contraseña actual es incorrecta. Por favor, intenta de nuevo.');
        } else if (response.error) {
          setError(`Error: ${response.error}`);
        } else {
          setError('Hubo un problema al cambiar la contraseña. Por favor, intenta de nuevo más tarde.');
        }
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setError('Hubo un problema al cambiar la contraseña. Por favor, intenta de nuevo más tarde.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form className="bg-[#222] p-6 rounded-md shadow-md">
        <div className="mb-6 text-left">
          <label htmlFor="currentPassword" className="text-white font-medium">Current Password:</label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full p-3 mt-2 rounded-md bg-[#333] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
            />
            <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="eye-icon">
              {showCurrentPassword ? <IoEyeOffOutline size={24} color="#999" /> : <IoEyeOutline size={24} color="#999" />}
            </button>
          </div>
        </div>

        <div className="mb-6 text-left">
          <label htmlFor="newPassword" className="text-white font-medium">New Password:</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-3 mt-2 rounded-md bg-[#333] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
            />
            <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="eye-icon">
              {showNewPassword ? <IoEyeOffOutline size={24} color="#999" /> : <IoEyeOutline size={24} color="#999" />}
            </button>
          </div>
        </div>

        <div className="mb-6 text-left">
          <label htmlFor="confirmPassword" className="text-white font-medium">Confirm New Password:</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 mt-2 rounded-md bg-[#333] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="eye-icon">
              {showConfirmPassword ? <IoEyeOffOutline size={24} color="#999" /> : <IoEyeOutline size={24} color="#999" />}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleChangePassword}
          className="w-full py-3 bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] text-white font-bold rounded-md hover:bg-gradient-to-r hover:from-[#FF4B2B] hover:to-[#FF416C] transition-all duration-300"
        >
          Change Password
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
