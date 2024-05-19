import React from 'react'
import basicRide from '../assets/images/basicRide_icon.png';
import vanRide from '../assets/images/vanRide_icon.png';
import vipRide from '../assets/images/vipRide_icon.png';

var rideClass = vanRide;
const TripsCard = () => {
  return (
    <div className='h-[100px] fixed w-[25%] bg-secondary rounded-[5px] mt-10 ml-10'>
        <img src={rideClass == 'basic'? basicRide:vanRide} className='h-[50px] relative left-[5%] top-[50%] -translate-y-1/2'  />
        <p className='relative bottom-[45%] left-[40%] font-bold'>Trip Destination</p>
        <p className='relative bottom-[45%] text-[14px] left-[40%] '>Date&Time</p>
        <p className='relative bottom-[45%] left-[40%] font-bold'>Trip Destination</p>
        <p className='relative bottom-[45%] left-[40%] font-bold'>Trip Destination</p>
    </div>
  )
}

export default TripsCard