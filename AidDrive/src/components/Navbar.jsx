import React from 'react'
import logo from '../assets/images/light-logo.png'
import accentLogo from '../assets/images/accentLogo.png'
import {Link} from 'react-router-dom';
// isLoggedin = false

// function guestHome() {
//   return(
//     <nav className="bg-primary h-[80px] text-whitish text-2xl rounded-b-[15px]">
//         <img className='absolute inset-y-3 left-5	h-auto w-auto z-40' src= {logo}/>
//         <a className='absolute h-7 w-18 inset-y-[25px] right-[255px] font-semibold hover:cursor-pointer'>TRIPS</a>
//         <a className='absolute h-7   w-18 inset-y-[25px] right-[140px] font-semibold hover:cursor-pointer'>ORDER</a>
//         <button className='absolute h-[35px] w-[100px] inset-y-[22px] right-[15px] rounded-md bg-accent text-primary font-bold  hover:bg-opacity-85 hover:text-whitish'>SIGNUP</button>
// </nav>
//   )
// }

// function userHome() {
//   return(
//     <nav className="bg-primary h-[80px] text-whitish text-2xl rounded-b-[15px]">
//         <img className='absolute inset-y-3 left-5	h-auto w-auto z-40' src= {logo}/>
//         <a className='absolute h-7 w-18 inset-y-[25px] right-[255px] font-semibold hover:cursor-pointer'>TRIPS</a>
//         <a className='absolute h-7   w-18 inset-y-[25px] right-[140px] font-semibold hover:cursor-pointer'>ORDER</a>
//         <img className='absolute inset-y-3 left-5	h-auto w-auto z-40' src= '../assets/images/profile-icon.png'/>
// </nav>
//   )
// }
const Navbar = () => {
    return (
        <nav className="bg-primary h-[80px] text-whitish text-2xl rounded-b-[15px] flex items-center">
            <Link to="/">
                <img 
                    className='h-auto w-auto relative left-5 z-40 cursor-pointer hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 hover:bg-opacity-85' 
                    src={logo} 
                    alt="Logo"
                    onMouseEnter={(e) => e.currentTarget.src = accentLogo}
                    onMouseLeave={(e) => e.currentTarget.src = logo}
                />
            </Link>
            {/* Uncomment and adjust these links as needed
            <Link to='/trips' className='relative h-7 w-18 inset-y-[25px] right-[255px] font-semibold hover:cursor-pointer'>TRIPS</Link>
            <Link to='/booking' className='relative h-7 w-18 inset-y-[25px] right-[140px] font-semibold hover:cursor-pointer'>ORDER</Link>
            */}
            <div className='relative text-[20px] h-[35px] w-[100px] rounded-[5px] bg-accent ml-auto mr-5 font-bold hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 hover:bg-opacity-85'>
                <Link to="/join" className='relative top-[5%] left-[10%] text-primary'>SIGNUP</Link> 
            </div>
        </nav>
    )
}

export default Navbar;

