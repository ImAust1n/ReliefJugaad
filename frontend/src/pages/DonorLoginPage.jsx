import React, { useState } from 'react';
import LoginPage from './LoginPage';
import { useAuthStore } from '../store/useAuthStore'

const DonorLoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData)
    // Add your authentication logic here
  };

  return (
    <LoginPage title="Donor / Volunteer" formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} 
     link="/donor-signup"
    />
  );
};

export default DonorLoginPage;