import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha'


const formSubmission = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var passwordConfirm = document.getElementById("passwordConfirmation").value;
    if(password !== passwordConfirm){
        alert('Please make sure to write the password twice identically!')
    }
    else{
    console.log('firstName',firstName);
    console.log('lastName',lastName);
    console.log('email',email);
    console.log('password',password);
    console.log('passwordConfirm',passwordConfirm);
    // if (e.files.length > 5) {
    //     alert("Only 5 files accepted.");
    //     e.preventDefault();}
}
}

const SignupPage = () => {
  return (
    <>
    <div className='bg-primary h-[700px] w-[1300px] relative left-1/2 -translate-x-1/2 top-[4rem] shadow-2xl rounded-[50px] '>
    <span className='text-[20px] font-bold flex items-center justify-center h-auto sm:text-[30px] relative top-3 text-whitish ' >SIGNUP FORM</span>
    
    <div className='relative w-[1300px] h-[550px] top-[20px] '>
    
    <form className='bg-secondary h-[550px] w-[500px] rounded-[20px] absolute left-20 inline-block '>
    <p className='m-0 font-bold text-primary pl-10 mt-5'>First Name:</p>
    <input id="firstName" type="text" maxLength="16" className='w-[420px] h-[30px] ring-[3px] ring-accent rounded-[2px] relative mt-2 ml-10 hover:-translate-y-1 transition ease-in-out delay-150'/>
    <p className='m-0 font-bold text-primary pl-10 mt-5'>Last Name:</p>
    <input id="lastName" type="text" maxLength="16" className='w-[420px] h-[30px] ring-[3px] ring-accent rounded-[2px] relative mt-2 ml-10 hover:-translate-y-1 transition ease-in-out delay-150'/>
    <p className='m-0 font-bold text-primary pl-10 mt-5'>Email Address:</p>
    <input id="email" type="email" maxLength="32" className='w-[420px] h-[30px] ring-[3px] ring-accent rounded-[2px] relative mt-2 ml-10 hover:-translate-y-1 transition ease-in-out delay-150'/>
    <p className='m-0 font-bold text-primary pl-10 mt-5'>Password:</p>
    <input id="password" type="password" maxLength="16" className='w-[420px] h-[30px] ring-[3px] ring-accent rounded-[2px] relative mt-2 ml-10 hover:-translate-y-1 transition ease-in-out delay-150'/>
    <p className='m-0 font-bold text-primary pl-10 mt-5'>Confirm Password:</p>
    <input id="passwordConfirmation" type="password" maxLength="16" className='w-[420px] h-[30px] ring-[3px] ring-accent rounded-[2px] relative mt-2 ml-10 hover:-translate-y-1 transition ease-in-out delay-150'/>
    {/* <button type='submit' className='w-[250px] h-[80px] bg-accent rounded-[10px] font-bold text-primary text-[20px] drop-shadow-md relative mt-10 left-[50%] -translate-x-1/2 hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 '>SUBMIT</button> */}
    <ReCAPTCHA className='font-bold text-primary text-[20px] drop-shadow-md relative mt-10 left-[70%] -translate-x-1/2' sitekey={'6Leq7NkpAAAAAE6hXaxuatEfTBjxJ2fJIXr99zCx'} />
    </form>
    
    <form onSubmit={formSubmission} className='bg-secondary h-[550px] w-[500px] rounded-[20px] absolute right-20 inline-block'>
    <span className='text-[14px] font-bold flex items-center justify-center h-auto sm:text-[20px] relative top-5 text-primary '>REGISTERATION DOCUMENTS</span>
    <span className='text-[14px] font-bold left-[50px] select-none sm:text-[18px] relative top-12 text-primary '>Please upload the following documents</span>
    <ul className='list-inside list-disc relative left-[50px] justify top-[50px] left-[50px] font-bold text-primary'>
        <li className=''>National ID  (Front-Back)</li>
        <li className=''>Driver’s License (Front-Back)</li>
        <li className=''>Criminal log done in the last 3 months</li>
    </ul>
    <label htmlFor="fileUploader" className='text-primary text-[14px] font-bold relative top-[48%] left-[32%]'>PDF,PNG,JPG formats only</label>
    <input type="file" required multiple accept='.pdf,.jpg,.png' id='fileUploader' className='text-transparent w-[400px] file:bg-primary file:h-[50px] file:w-[120px] file:border-none file:relative file:top-[50%] file:left-[50%] file:-translate-x-1/2  h-[200px] outline-dashed outline-primary rounded-[10px] relative left-[50%] top-[30%] -translate-x-1/2 -translate-y-1/2 file:cursor-pointer file:cursor-pointer file:rounded-[5px] file:font-bold file:hover:-translate-y-[30px] file:hover:scale-110 file:transition file:ease-in-out file:delay-150 file:hover:text-whitish file:text-whitish'/>
    <button type='submit' className='w-[250px] h-[80px] bg-accent rounded-[10px] font-bold text-primary text-[20px] translate-y-4 drop-shadow-md relative mt-20 left-[50%] -translate-x-1/2  hover:scale-110 transition ease-in-out delay-150 '>SUBMIT</button>
    </form>
    </div>
    </div>
    
    
    </>
  )
}

export default SignupPage;
