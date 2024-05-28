import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';


const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/login', { username, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/admin/dashboard';
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <>
    <div className='bg-primary h-[700px] w-[1100px] relative left-1/2 -translate-x-1/2 top-[4rem] shadow-2xl rounded-[50px]'>
                <span className='text-[20px] font-bold flex items-center justify-center h-auto sm:text-[30px] relative top-3 text-whitish'>ADMIN LOGIN FORM</span>
                <div className='relative w-[1300px] h-[550px] left-[50%] transform -translate-x-1/2 top-[20px]'>
                    <form onSubmit={handleLogin} className='bg-secondary h-[550px] w-[500px] rounded-[20px] absolute left-[50%] transform -translate-x-1/2 inline-block'>
                        <p className='m-0 font-bold text-primary pl-10 mt-10'>Username:</p>
                        <input
                        id="username"
                        required
                        maxLength="16"
                        type="text"
                        placeholder=" Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='w-[420px] h-[30px] ring-[3px] ring-accent rounded-[2px] relative mt-2 ml-10 hover:-translate-y-1 transition ease-in-out delay-150' />
                        <p className='m-0 font-bold text-primary pl-10 mt-5'>Password:</p>
                        <input 
                        id="password"
                        type="password"
                        placeholder=" Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength='6'
                        maxLength="16"
                        className='w-[420px] h-[30px] ring-[3px] ring-accent rounded-[2px] relative mt-2 ml-10 hover:-translate-y-1 transition ease-in-out delay-150' />
                        <ReCAPTCHA ref={recaptcha} className='font-bold text-primary text-[20px] drop-shadow-md fixed mt-14 left-[50%] -translate-x-1/2' sitekey='6Leq7NkpAAAAAE6hXaxuatEfTBjxJ2fJIXr99zCx' />
                        <button type='submit' className='fixed bottom-[5%] left-[50%] transform -translate-x-1/2 w-[250px] h-[80px] bg-accent rounded-[10px] font-bold text-primary text-[20px] drop-shadow-md hover:scale-110 transition ease-in-out delay-150 z-50'>LOGIN</button>
                    </form>
                </div>
            </div>
    </>
  );
};

export default AdminLogin;
