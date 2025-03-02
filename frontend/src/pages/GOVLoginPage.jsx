import React, { useState } from 'react';
import '../LoginPage.css';
import LoginPage from './LoginPage';
import { useGOVStore } from '../store/useGOVStore.js';
 
const GOVLoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useGOVStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData)
  };

  return (
    <LoginPage title="Government / NDMA" formData={formData} setFormData={setFormData} handleSubmit={handleSubmit}
     link="/gov-signup"
    />
  );
};

export default GOVLoginPage;
