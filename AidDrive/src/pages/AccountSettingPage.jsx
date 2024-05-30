import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import profileImg from '../assets/images/profile-icon-primary.png'

// const [disabled,setDisabled] = useState(true);


const AccountSettingPage = () => {
  return (
    <>
    <p className="text-[36px] font-bold flex items-center justify-center h-auto sm:text-[40px] mt-[30px] text-primary">Account Settings</p>
    <div className='bg-primary w-[80%] h-[700px] rounded-[20px] shadow-lg fixed top-[20%] left-[50%] -translate-x-1/2'>
    <div className='bg-whitish w-[15%] h-[300px] rounded-[5px] fixed left-[5%] top-[10%]'>
        <Link to='/trips' className='fixed top-[10%] ml-5 mt-5 text-[18px] font-bold text-primary transition ease-in-out delay-150 hover:scale-110 hover:-translate-y-1'>Trip History</Link>
        <Link to={{}} className='fixed top-[15%] ml-5 mt-5 text-[18px] font-bold text-accent transition ease-in-out delay-150 hover:scale-110 hover:-translate-y-1'>Account Settings</Link>
    </div>
    <div className='bg-whitish w-[55%] h-[550px] rounded-[5px] fixed left-[25%] top-[10%]'>
    <img src={profileImg} className='relative top-[3%] h-[60px] left-[5%]'/>
    <label htmlFor="firstName" className='fixed top-[25%] left-[27%] font-bold text-primary' >First Name:</label>
    <input id="firstName" type="text" minLength='3' maxLength="16" disabled placeholder='' className='w-[320px] h-[30px] ring-[3px] ring-accent rounded-[2px] disabled:opacity-75 fixed top-[25%] left-[35%] hover:-translate-y-1 transition ease-in-out delay-150' />
    <label htmlFor="lastName" className='fixed top-[32%] left-[27%] font-bold text-primary' >Last Name:</label>
    <input id="lastName" type="text" minLength='3' maxLength="16" disabled placeholder='' className='w-[320px] h-[30px] ring-[3px] ring-accent rounded-[2px] disabled:opacity-75 fixed top-[32%] left-[35%] hover:-translate-y-1 transition ease-in-out delay-150' />
    <label htmlFor="email" className='fixed top-[39%] left-[27%] font-bold text-primary' >Email:</label>
    <input id="email" type="email" minLength='3' maxLength="32" disabled placeholder='' className='w-[320px] h-[30px] ring-[3px] ring-accent rounded-[2px] disabled:opacity-75 fixed top-[39%] left-[35%] hover:-translate-y-1 transition ease-in-out delay-150' />
    <label htmlFor="password" className='fixed top-[46%] left-[27%] font-bold text-primary' >Password:</label>
    <input id="password" type="password" minLength='6' maxLength="16"  disabled placeholder='' className='w-[320px] h-[30px] ring-[3px] ring-accent rounded-[2px] disabled:opacity-75 fixed top-[46%] left-[35%] hover:-translate-y-1 transition ease-in-out delay-150' />
    <div className=' hover:-translate-y-1 hover:text-whitish hover:scale-110 fixed bottom-[40%] left-[49%] transition ease-in-out delay-150 w-[110px] h-[40px] bg-accent text-primary font-bold hover:font-bold text-[18px]  rounded-[5px] '>
        <Link to='' className='relative top-[20%] left-[36%] '>Edit</Link>
    </div>
    <button className='fixed outline outline-2 outline-red-600 bg-secondary bottom-[15%] right-[22%] h-[50px] w-[150px] text-primary font-bold'>LOGOUT</button>
    </div>
    </div>
    </>
  )
}

export default AccountSettingPage;