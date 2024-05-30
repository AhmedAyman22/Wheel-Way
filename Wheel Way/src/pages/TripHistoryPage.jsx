import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import TripsCard from '../components/TripsCard'

const TripHistoryPage = () => {
  return (
<>
<p className="text-[36px] font-bold flex items-center justify-center h-auto sm:text-[40px] mt-[30px] text-primary">Trips History</p>
    <div className='bg-primary w-[80%] h-[700px] rounded-[20px] shadow-lg fixed top-[20%] left-[50%] -translate-x-1/2'>
    <div className='bg-whitish w-[15%] h-[300px] rounded-[5px] fixed left-[5%] top-[10%]'>
        <Link to={{}} className='fixed top-[10%] ml-5 mt-5 text-[18px] font-bold text-accent transition ease-in-out delay-150 hover:scale-110 hover:-translate-y-1'>Trip History</Link>
        <Link to='/account' className='fixed top-[15%] ml-5 mt-5 text-[18px] font-bold text-primary transition ease-in-out delay-150 hover:scale-110 hover:-translate-y-1'>Account Settings</Link>
    </div>
    <div className='bg-whitish w-[55%] h-[550px] rounded-[5px] fixed left-[25%] top-[10%]'>
    <TripsCard />
    <TripsCard />
    <TripsCard />
    <TripsCard />
    </div>
    </div>
</>
)
}

export default TripHistoryPage