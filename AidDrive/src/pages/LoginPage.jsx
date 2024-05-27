// src/pages/LoginPage.js
import React, { useState, useRef, useContext } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './userinfo';

const LoginPage = () => {
  const [accountType, setAccountType] = useState('');
  const recaptcha = useRef(null);
  const navigate = useNavigate();
  const { setUser, setUserId } = useContext(UserContext); // Destructure setUserId from UserContext

  const submitLogin = async (event) => {
    event.preventDefault();
    const captchaValue = recaptcha.current?.getValue();
    if (!captchaValue) {
      alert('Please verify the reCAPTCHA!');
    } else if (accountType === '') {
      alert('Please choose the account type!');
    } else {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      try {
        const response = await axios.post('http://localhost:3001/api/login', { email, password, accountType });
        const user = response.data.first_name; // Assuming the response includes userId
        setUser(user); // Store userId in context
        const userId = response.data.user_id; // Assuming the response includes userId
        setUserId(userId); // Store userId in context
        console.log(userId);
        alert('Form submission successful!');
        navigate('/booking'); // Redirect to booking page
      } catch (error) {
        console.error('There was an error logging in:', error);
        alert('Incorrect Email and/or Password!');
      }
    }
  };

  const handleRadioChange = (e) => {
    setAccountType(e.target.value);
  };

  return (
    <div className='bg-primary h-[700px] w-[1100px] relative left-1/2 -translate-x-1/2 top-[4rem] shadow-2xl rounded-[50px]'>
      <span className='text-[20px] font-bold flex items-center justify-center h-auto sm:text-[30px] relative top-3 text-whitish'>LOGIN FORM</span>
      <div className='relative w-[1300px] h-[550px] left-[50%] transform -translate-x-1/2 top-[20px]'>
        <form onSubmit={submitLogin} className='bg-secondary h-[550px] w-[500px] rounded-[20px] absolute left-[50%] transform -translate-x-1/2 inline-block'>
          <p className='m-0 font-bold text-primary pl-10 mt-10'>Email Address:</p>
          <input id="email" type="email" required maxLength="32" className='w-[420px] h-[30px] ring-[3px] ring-accent rounded-[2px] relative mt-2 ml-10 hover:-translate-y-1 transition ease-in-out delay-150' />
          <p className='m-0 font-bold text-primary pl-10 mt-5'>Password:</p>
          <input id="password" type="password" required minLength='6' maxLength="16" className='w-[420px] h-[30px] ring-[3px] ring-accent rounded-[2px] relative mt-2 ml-10 hover:-translate-y-1 transition ease-in-out delay-150' />
          <a href="#" className='text-blue-700 text-[14px] font-bold relative top-[2%] left-[10%]'>Forgot Password?</a>
          <div className='relative left-[10%] top-[4%]'>
            <p className='text-[16px] font-bold text-primary mb-1'>Account Type:</p>
            <label className='text-[15px] font-bold text-primary'>
              Rider
              <input
                type="radio"
                value="rider"
                checked={accountType === 'rider'}
                onChange={handleRadioChange}
                className="checked:bg-blue-500 h-[.8rem] w-[.8rem] ml-2"
              />
            </label>
            <label className='text-[15px] font-bold text-primary ml-4'>
              Captain
              <input
                type="radio"
                value="captain"
                checked={accountType === 'captain'}
                onChange={handleRadioChange}
                className="checked:bg-blue-500 h-[.8rem] w-[.8rem] ml-2"
              />
            </label>
          </div>
          <ReCAPTCHA ref={recaptcha} className='font-bold text-primary text-[20px] drop-shadow-md fixed mt-14 left-[50%] -translate-x-1/2' sitekey='6Leq7NkpAAAAAE6hXaxuatEfTBjxJ2fJIXr99zCx' />
          <button type='submit' className='fixed bottom-[5%] left-[50%] transform -translate-x-1/2 w-[250px] h-[80px] bg-accent rounded-[10px] font-bold text-primary text-[20px] drop-shadow-md hover:scale-110 transition ease-in-out delay-150 z-50'>LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
