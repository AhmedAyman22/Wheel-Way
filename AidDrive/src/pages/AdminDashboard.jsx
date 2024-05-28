import React, {useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import profileImg from '../assets/images/profile-icon-primary.png'




const AdminDashboard = () => {
    var userFound = false;
    const [editing, setEditing] = useState('EDIT');
    const [accountType, setAccountType] = useState('');

    
    const handleRadioChange = (e) => {
        setAccountType(e.target.value);
    };

    const firstNameInputField = useRef('');
    const lastNameInputField = useRef('');
    const emailInputField = useRef('');
    const passwordInputField = useRef('');

    var fnamePlaceholder = firstNameInputField.current.placeholder;
    var lnamePlaceholder = lastNameInputField.current.placeholder;
    var emailPlaceholder = emailInputField.current.placeholder;
    var passwordPlaceholder = passwordInputField.current.placeholder;


    const searchUser = () =>{

    };

    const submitEdit = () =>{

    };
    

    const enableInput = () =>{
        
        if(editing == 'EDIT'){
            setEditing('SAVE');

            firstNameInputField.current.disabled = false;
            lastNameInputField.current.disabled = false;
            emailInputField.current.disabled = false;
            passwordInputField.current.disabled = false;
        }
        else if (editing == 'SAVE'){
            setEditing('EDIT');

            firstNameInputField.current.disabled = true;
            lastNameInputField.current.disabled = true;
            emailInputField.current.disabled = true;
            passwordInputField.current.disabled = true;
            fnamePlaceholder = '';
            lnamePlaceholder = '';
            emailPlaceholder = '';
            passwordPlaceholder = '';

        }
        
}
  return (
    <>
    <p className="text-[36px] font-bold flex items-center justify-center h-auto sm:text-[40px] mt-[30px] text-primary">ADMIN INTERFACE</p>
    <div className='bg-primary w-[80%] h-[700px] rounded-[20px] shadow-lg fixed top-[20%] left-[50%] -translate-x-1/2'>
    <div className='bg-whitish w-[15%] h-[300px] rounded-[5px] fixed left-[5%] top-[10%]'>
    {
            !userFound  && (
                <p className='fixed top-[15%] ml-5 mt-5 text-[18px] font-bold cursor-pointer text-accent transition ease-in-out delay-150 hover:scale-110 hover:-translate-y-1'>User Search</p>
    )}
    {
            userFound  && (
                <p className='fixed top-[15%] ml-5 mt-5 text-[18px] font-bold cursor-pointer text-accent transition ease-in-out delay-150 hover:scale-110 hover:-translate-y-1'>User Data</p>
    )}
    </div>
    <div className='bg-whitish w-[55%] h-[550px] rounded-[5px] fixed left-[25%] top-[10%]'>
        {
            !userFound  && (
                <>
            <p className='text-primary font-bold text-[18px] relative top-[5%] left-[20%]'>Please insert the Email for the user you're searching for</p>
            <label htmlFor="email" className='fixed top-[25%] left-[27%] font-bold text-primary' >Email:</label>
            <input id="email" type="email" minLength='3' maxLength="32" placeholder='' className='w-[320px] h-[30px] ring-[3px] ring-accent rounded-[2px] disabled:opacity-75 fixed top-[25%] left-[31%] hover:-translate-y-1 transition ease-in-out delay-150' />
            <div className='fixed top-[35%] left-[27%]'>
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
                                Driver
                                <input
                                    type="radio"
                                    value="driver"
                                    checked={accountType === 'driver'}
                                    onChange={handleRadioChange}
                                    className="checked:bg-blue-500 h-[.8rem] w-[.8rem] ml-2"
                                />
                            </label>
                        </div>
            <button  onClick={searchUser}  className=' hover:-translate-y-1 hover:text-whitish hover:scale-110 fixed bottom-[50%] left-[45%] transition ease-in-out delay-150 w-[110px] h-[40px] bg-accent text-primary font-bold hover:font-bold text-[18px]  rounded-[5px] '>
                Search
            </button>
            </>

            )
        }
        {
            userFound  && (
            <>
            <div className='bg-whitish w-[55%] h-[550px] rounded-[5px] fixed left-[25%] top-[10%]'>
            <img src={profileImg} className='relative top-[3%] h-[60px] left-[5%]'/>
            <label htmlFor="firstName" className='fixed top-[25%] left-[27%] font-bold text-primary' >First Name:</label>
            <input id="firstName" type="text" minLength='3' maxLength="16" ref={firstNameInputField} disabled placeholder='' className='w-[320px] h-[30px] ring-[3px] ring-accent rounded-[2px] disabled:opacity-75 fixed top-[25%] left-[35%] hover:-translate-y-1 transition ease-in-out delay-150' />
            <label htmlFor="lastName" className='fixed top-[32%] left-[27%] font-bold text-primary' >Last Name:</label>
            <input id="lastName" type="text" minLength='3' maxLength="16" ref={lastNameInputField} disabled placeholder='' className='w-[320px] h-[30px] ring-[3px] ring-accent rounded-[2px] disabled:opacity-75 fixed top-[32%] left-[35%] hover:-translate-y-1 transition ease-in-out delay-150' />
            <label htmlFor="email" className='fixed top-[39%] left-[27%] font-bold text-primary' >Email:</label>
            <input id="email" type="email" minLength='3' maxLength="32" ref={emailInputField} disabled placeholder='' className='w-[320px] h-[30px] ring-[3px] ring-accent rounded-[2px] disabled:opacity-75 fixed top-[39%] left-[35%] hover:-translate-y-1 transition ease-in-out delay-150' />
            <label htmlFor="password" className='fixed top-[46%] left-[27%] font-bold text-primary' >Password:</label>
            <input id="password" type="password" minLength='6' maxLength="16"  ref={passwordInputField} disabled placeholder='' className='w-[320px] h-[30px] ring-[3px] ring-accent rounded-[2px] disabled:opacity-75 fixed top-[46%] left-[35%] hover:-translate-y-1 transition ease-in-out delay-150' />
            <button onClick= {enableInput} className=' hover:-translate-y-1 hover:text-whitish hover:scale-110 fixed bottom-[40%] left-[49%] transition ease-in-out delay-150 w-[110px] h-[40px] bg-accent text-primary font-bold hover:font-bold text-[18px]  rounded-[5px] '>
                {editing}
            </button>
            <button className='fixed outline outline-2 outline-accent bg-secondary bottom-[15%] right-[22%] h-[50px] w-[150px] text-primary font-bold' onClick={submitEdit}>SUBMIT</button> 

            </div>
            </>
        )}
    </div>
    </div>
    </>
  )
}

export default AdminDashboard