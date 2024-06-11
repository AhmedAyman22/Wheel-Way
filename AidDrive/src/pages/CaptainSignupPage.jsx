import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import uniqid from 'uniqid';
import fileDelete from '../assets/images/file-remove.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CaptainSignupPage = () => {
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState({});
  const recaptcha = useRef();
  const fileInputRef = useRef(null);

  const formSubmission = async (event) => {
    event.preventDefault();
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var mobile = document.getElementById("mobileNumber").value;

    if (!validatePassword(password)) {
      alert('Password must be at least 6 characters long.');
      return;
    } else {
      console.log('firstName', firstName);
      console.log('lastName', lastName);
      console.log('email', email);
      console.log('password', password);
      console.log('mobile', mobile);

      const captchaValue = recaptcha.current?.getValue();
      if (!captchaValue) {
        alert('Please verify the reCAPTCHA!');
      } else {
        try {
          const response = await axios.post('http://localhost:3001/api/captain/signup', { firstName, lastName, email, password, mobile },{ withCredentials: true });
          console.log(response.data);
        } catch (error) {
          console.error('There was an error signing up:', error);
        }
      }
    }
  };

  const validatePassword = (password) => {
    const minLength = 6;
    if (password.length < minLength) return false;
    return true;
  };

  const validateMobile = (e) => {
    const value = e.target.value;
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    setMobileNumber(numericValue);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newUploadedFiles = {};

    if (files.length > 3) {
      alert('File count should not exceed 3 files.');
      event.target.value = null;
      return;
    }

    for (let i = 0; i < files.length; i++) {
      if (files[i].type !== 'image/png' && files[i].type !== 'image/jpeg') {
        alert('Please select a PNG or JPEG image file.');
        event.target.value = null;
        return;
      }
      if (files[i].size > 3145728) {
        alert('File size should not exceed 3MB.');
        event.target.value = null;
        return;
      }
      const newID = uniqid();
      newUploadedFiles['id_' + newID] = {
        Name: files[i].name,
        Type: files[i].type,
        Size: files[i].size,
        filePath: "lessa",
        Date: new Date().toISOString(),
        CaptainID: "lessa",
      };
    }
    setUploadedFiles(newUploadedFiles);
    console.log(newUploadedFiles);
  };

  const deleteFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
      setUploadedFiles({});
    }
    console.log('deleteFiles');
  };


  return (
    <div className='bg-primary h-[700px] w-[1300px] relative left-1/2 -translate-x-1/2 top-[4rem] shadow-2xl rounded-[50px] '>
      <span className='text-[20px] font-bold flex items-center justify-center h-auto sm:text-[30px] relative top-3 text-whitish ' >
        CAPTAIN SIGNUP FORM
      </span>
      <div className='relative w-[1300px] h-[550px] top-[20px] '>
        <form className='bg-secondary h-[550px] w-[500px] rounded-[20px] absolute left-20 inline-block '>
          <p className='m-0 font-bold text-primary pl-10 mt-5'>First Name:</p>
          <input id="firstName" type="text" required minLength='3' maxLength="16" className='w-[420px] h-[30px] ring-[3px] ring-accent rounded-[2px] relative mt-2 ml-10 hover:-translate-y-1 transition ease-in-out delay-150' />
          <p className='m-0 font-bold text-primary pl-10 mt-5'>Last Name:</p>
          <input id="lastName" type="text" required minLength='3' maxLength="16" className='w-[420px] h-[30px] ring-[3px] ring-accent rounded-[2px] relative mt-2 ml-10 hover:-translate-y-1 transition ease-in-out delay-150' />
          <p className='m-0 font-bold text-primary pl-10 mt-5'>Email Address:</p>
          <input id="email" type="email" required maxLength="32" className='w-[420px] h-[30px] ring-[3px] ring-accent rounded-[2px] relative mt-2 ml-10 hover:-translate-y-1 transition ease-in-out delay-150' />
          <p className='m-0 font-bold text-primary pl-10 mt-5'>Mobile Number:</p>
          <input id="mobileNumber" value={mobileNumber} onChange = {validateMobile} defaultCountry="EG" required minLength='11' type="tel" maxLength="14" className='w-[420px] h-[30px] ring-[3px] ring-accent rounded-[2px] relative mt-2 ml-10 hover:-translate-y-1 transition ease-in-out delay-150' />
          <p className='m-0 font-bold text-primary pl-10 mt-5'>Password:</p>
          <input id="password" type="password" required minLength='6' maxLength="16" className='w-[420px] h-[30px] ring-[3px] ring-accent rounded-[2px] relative mt-2 ml-10 hover:-translate-y-1 transition ease-in-out delay-150' />
          <ReCAPTCHA ref={recaptcha} className='font-bold text-primary text-[20px] drop-shadow-md relative mt-10 left-[70%] -translate-x-1/2' sitekey='6Leq7NkpAAAAAE6hXaxuatEfTBjxJ2fJIXr99zCx' />
        </form>
        <form onSubmit={formSubmission} className=' bg-secondary h-[550px] w-[500px] rounded-[20px] absolute right-20 inline-block'>
          <img onClick={deleteFiles} className='fixed transition ease-in-out delay-150 top-[41%] left-[90.5%] hover:opacity-80 hover:-translate-y-1 hover:scale-[105%] cursor-pointer  h-[35px] w-[35px]' src={fileDelete} />
          <span className='text-[14px] font-bold mt-6 flex items-center justify-center sm:text-[20px] relative text-primary '>REGISTRATION DOCUMENTS</span>
          <span className='text-[14px] font-bold left-[50px] select-none sm:text-[18px] relative top-5 text-primary '>Please upload the following documents</span>
          <ul className='list-inside list-disc relative left-[50px] justify top-[30px] left-[50px] font-bold text-primary'>
            <li>National ID (Front-Back)</li>
            <li>Driver’s License (Front-Back)</li>
            <li>Criminal log done in the last 3 months</li>
          </ul>
          <label htmlFor="fileUploader" className='text-primary text-[14px] font-bold relative top-[46%] left-[32%] select-none '>PNG and JPG formats only</label>
          <input ref={fileInputRef} type="file" id='fileInput' onChange={handleFileChange} required multiple accept='.pdf,.jpg,.png' className=' text-transparent w-[400px] file:bg-primary file:h-[50px] file:w-[120px] file:border-none file:relative file:top-[50%] file:left-[50%] file:-translate-x-1/2  h-[200px] outline-dashed outline-primary rounded-[10px] relative left-[50%] top-[27%] -translate-x-1/2 -translate-y-1/2 file:cursor-pointer file:rounded-[5px] file:font-bold file:hover:-translate-y-[30px] file:hover:scale-110 file:transition file:ease-in-out file:delay-150 file:hover:text-whitish file:text-whitish'/>
          <ul  className=' w-[390px] text-primary display:inline-block; text-[14px] font-bold relative bottom-[27%] left-[12%] text-primary font-bold text-[14px] text-wrap'>
              {Object.values(uploadedFiles).map(file => (
                <li key={file.Name}>
                  {file.Name.length > 50
                  ? file.Name.substr(0, 50)+file.Name.substr(-4) : file.Name
                  }
                </li>
              ))}
            </ul>
          <button type='submit' className='w-[250px] h-[80px] bg-accent rounded-[10px] font-bold text-primary text-[20px] translate-y-4 drop-shadow-md fixed bottom-28 right-20 transform -translate-x-1/2 -translate-y-1 hover:scale-110 transition ease-in-out delay-150 z-50'>SUBMIT</button>
        </form>
        <Link to='/login'className='font-bold text-[14px] text-blue-700 hover:text-blue-500 fixed bottom-[5%] left-[50%] transform -translate-x-1/2'>Already have an account?</Link>
      </div>
    </div>
  );
};

export default CaptainSignupPage;