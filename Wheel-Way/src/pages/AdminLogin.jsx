import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitLogin = async (event) => {
    event.preventDefault();
    if (email === '' || password === '') {
      alert('Please enter both email and password!');
    } else {
      try {
        const response = await axios.post('http://localhost:3001/api/admin/login', { email, password });
        alert('Login successful!');
        navigate('/admin/dashboard'); // Redirect to the admin dashboard
      } catch (error) {
        console.error('There was an error logging in:', error);
        alert('Incorrect Email and/or Password!');
      }
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={submitLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"  
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
