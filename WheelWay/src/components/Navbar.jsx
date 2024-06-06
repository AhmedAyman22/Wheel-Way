import React,{useState} from 'react';
import logo from '../assets/images/lightLogo.png';
import accentLogo from '../assets/images/accentLogo.png';
import {Link} from 'react-router-dom';
import profileIcon from '../assets/images/profile-icon.png';
import accentProfile from '../assets/images/accentProfile-icon.png';


const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(true);
    const [userType, setUserType] = useState('rider');

    return (
        <nav className="bg-primary h-[80px] text-whitish text-2xl rounded-b-[15px] flex items-center">
            <Link to="/">
                <img 
                    className='h-auto w-auto relative left-[50%] z-40 cursor-pointer hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 hover:bg-opacity-85' 
                    src={logo} 
                    alt="Logo"
                    onMouseEnter={(e) => e.currentTarget.src = accentLogo}
                    onMouseLeave={(e) => e.currentTarget.src = logo}
                />
            </Link>
            {loggedIn && <>
            <Link to='/trips' className='fixed right-[10%] font-bold hover:cursor-pointer cursor-pointer hover:-translate-y-1/8 hover:scale-110 transition ease-in-out delay-150 hover:text-accent hover:bg-opacity-85'>TRIPS</Link>
            {userType == 'rider' ?
            <Link to='/booking' className='fixed  right-[16%] font-bold hover:cursor-pointer cursor-pointer hover:-translate-y-1/8 hover:scale-110 transition ease-in-out delay-150 hover:text-accent hover:bg-opacity-85'>ORDER</Link>: 
            <Link to='/triphunting' className='fixed  right-[16%] font-bold hover:cursor-pointer cursor-pointer hover:-translate-y-1/8 hover:scale-110 transition ease-in-out delay-150 hover:text-accent hover:bg-opacity-85'>HUNT</Link>
}
            <Link to="/account">
                <img 
                    draggable='false'
                    className='h-[50px] w-[50px] fixed right-[5%] top-[40px] -translate-y-1/2 cursor-pointer hover:-translate-y-1/2 hover:scale-110 transition ease-in-out delay-150 hover:bg-opacity-85' 
                    src={profileIcon} 
                    alt="profile icon"
                    onMouseEnter={(e) => e.currentTarget.src = accentProfile}
                    onMouseLeave={(e) => e.currentTarget.src = profileIcon}
                />
            </Link>
    </>}
            {
                !loggedIn &&
                <div className='relative text-[20px] h-[35px] w-[100px] rounded-[5px] bg-accent ml-auto mr-5 font-bold hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 hover:bg-opacity-85'>
                <Link to="/join" className='relative top-[5%] left-[10%] text-primary'>SIGNUP</Link> 
            </div>}
        </nav>
    )
}

export default Navbar;

