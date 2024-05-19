import React from 'react'
import basicRide from '../assets/images/basicRide_icon.png';
import vanRide from '../assets/images/vanRide_icon.png';
import vipRide from '../assets/images/vipRide_icon.png';

var rideClass = 'basic';
const TripsCard = () => {
  return (
    <div className='relative h-[100px] w-[35%] bg-secondary rounded-[10px] mt-8 ml-10 hover:opacity-90 hover:scale-110 hover:-translate-y-1'>
        <img src={rideClass === 'basic' ? basicRide : rideClass === 'van' ? vanRide : rideClass === 'vip' ? vipRide : null}className='h-[40px] relative left-[5%] top-[50%] -translate-y-1/2'  />
        <div className='left-[35%]  ml-5'>
          <p className='relative left-[35%] bottom-8 font-bold'>Trip Destination</p>
          <p className='relative text-[14px] bottom-8 left-[40%]'>Date&Time</p>
          <p className='relative text-[14px] bottom-8 left-[40%]'>Price</p>
          <p className='relative text-[14px] bottom-8 left-[40%] '>Status</p>
        </div>
    </div>
  )
}

export default TripsCard