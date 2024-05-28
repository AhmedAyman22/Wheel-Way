import React, {useState} from 'react'
import MapView, { distanceinKM, tripDurationinMins } from '../components/MapView'; 
import { Link } from 'react-router-dom';
import profileImg from '../assets/images/profile-icon.png'
import filledStar from '../assets/images/filled-star.png' 

//const [hunting, setHunting] = setState(false); 
var tripDetails = {}



const Pop  = () => {
    // tripDetails = imported from backend;
    const coords = {
        pickupLat: pickupCoordinates?.lat,
        pickupLng: pickupCoordinates?.lng,
        dropoffLat: dropoffCoordinates?.lat,
        dropoffLng: dropoffCoordinates?.lng,
      };
}  
// const [selectedRide, setSelectedRide] = useState(null);


// setSelectedRide(selectedRide === null ? {} : null);

const TripHuntingPage = () => {
  

  return (
    <>
    <p className="text-[36px] font-bold flex items-center justify-center h-auto sm:text-[48px] mt-[30px] text-primary">TRIP HUNT</p>
    <div className='h-[650px] w-[65%] fixed left-1/2 -translate-x-1/2 top-[22%] shadow-2xl rounded-[50px]'>
    
    {/* <MapView  key={JSON.stringify(selectedRide)} /> */}
    <div className="w-[450px] h-[280px] bg-primary text-whitish z-40 absolute top-[75%] left-[50%] transform -translate-x-1/2 drop-shadow-md z-50	-translate-y-1/2 rounded-[20px]">   
          <img src={profileImg} className='fixed top-[13%] h-[60px] left-[5%]'/>
          <ul className='w-[400px] h-[200px] text-whitish fixed top-[10%] left-[10%] font-bold  '>
            <li className=' relative ml-16 text-[16px] mt-2'>Name</li>
            <li className=' relative ml-16 text-[16px] mt-2'>Pickup Address</li>
            <li className=' relative ml-16 text-[16px] mt-2'>Dropoff Address</li>
            <li className=' relative ml-16 text-[16px] mt-2'>Duration</li>
            <li className=' relative ml-16 text-[16px] mt-2'>Price</li>
          </ul>
          <img src={filledStar} className='h-[30px] fixed right-[18%] top-[12%]' />
          <p className='h-[40px] fixed right-[11%] top-[13%] text-[18px]'>4.5</p>
          <div className=' hover:-translate-y-1 hover:text-whitish hover:scale-110 fixed bottom-[10%] left-[10%] transition ease-in-out delay-150 w-[120px] h-[50px] bg-accent text-primary font-bold hover:font-bold text-[18px]  rounded-[5px] '>
          <Link className='relative top-[20%] left-[25%] '>Decline</Link>
          </div>
          <div className=' hover:-translate-y-1 hover:text-whitish hover:scale-110 fixed bottom-[10%] right-[10%] transition ease-in-out delay-150 w-[120px] h-[50px] bg-accent text-primary font-bold hover:font-bold text-[18px]  rounded-[5px] '>
          <Link className='relative top-[20%] left-[25%] '>Accept</Link>
          </div>
        </div>
    </div>
    </>
  )
}

export default TripHuntingPage