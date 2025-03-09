import React, { useState } from 'react';
import LoginPage from './LoginPage';
import { useNGOStore } from '../store/useNGOStore.js'

const NGOLoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useNGOStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData)
  };

  return (
    <LoginPage title="NGO" formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} 
    link="/ngo-signup"
    />
  );
};

export default NGOLoginPage;
