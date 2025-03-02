import React, { useState } from 'react';
import '../LoginPage.css';
import LoginPage from './LoginPage';

const GOVLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted with:', { email, password });
    // Add your authentication logic here
  };

  return (
    <LoginPage title="Government / NDMA" email={email} password={password}
     setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSubmit}
     link="/gov-signup"
    />
  );
};

export default GOVLoginPage;
