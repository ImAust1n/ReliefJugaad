import React, { useState } from 'react';
import '../LoginPage.css';
import LoginPage from './LoginPage';

const DonorLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted with:', { email, password });
    // Add your authentication logic here
  };

  return (
    <LoginPage title="Donor / Volunteer" email={email} password={password}
     setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSubmit} 
     link="/donor-signup"
    />
  );
};

export default DonorLoginPage;