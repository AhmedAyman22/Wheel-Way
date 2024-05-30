import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import profileImg from '../assets/images/profile-icon.png';
import filledStar from '../assets/images/filled-star.png';
import { TailSpin } from 'react-loader-spinner'


const TripHuntingPage = () => {
  const [userLocation, setUserLocation] = useState();
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  const [tripFound, setTripFound] = useState(false);
  const [hunting, setHunting] = useState(false);
  const [loader, setLoader] = useState(false);

const Pop  = () => {
    // tripDetails = imported from backend;
    const coords = {
        pickupLat: pickupCoordinates?.lat,
        pickupLng: pickupCoordinates?.lng,
        dropoffLat: dropoffCoordinates?.lat,
        dropoffLng: dropoffCoordinates?.lng,
      };
}
const hunt  = () => {
  setHunting(true);
  setLoader(true);

}
const stopHunting  = () => {
  setHunting(false);
  setLoader(false);

}  

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationPermissionGranted(true);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setLocationPermissionGranted(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <>
      <p className="text-[36px] font-bold flex items-center justify-center h-auto sm:text-[48px] mt-[30px] text-primary">TRIP HUNT</p>
      <div className='h-[650px] w-[65%] fixed left-1/2 -translate-x-1/2 top-[22%] shadow-2xl rounded-[50px]'>
        
        {locationPermissionGranted && (
          <Map coordinates={userLocation} />
        )}
        {loader &&<>
        <div className="w-[450px] h-[300px] bg-primary text-whitish z-40 absolute top-[50%] left-[50%] transform -translate-x-1/2 drop-shadow-md z-50	-translate-y-1/2 rounded-[20px]">
          <p className="text-[20px] font-bold flex items-center justify-center h-auto sm:text-[48px] fixed top-[5%] -translate-x-1/2 left-[50%] text-accent">HUNTING!</p>
         <TailSpin
            visible={true}
            height="90"
            width="90"
            color="#B38D97"
            ariaLabel="Loading..."
            radius="1"
            wrapperStyle={{}}
            wrapperClass="fixed -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%]"
        />
        <button 
          className='hover:-translate-y-1 hover:text-whitish hover:scale-110 fixed bottom-[10%] right-[50%] translate-x-1/2 transition ease-in-out delay-150
          w-[130px] h-[60px] bg-accent text-primary font-bold hover:font-bold text-[24px] rounded-[5px]'
          onClick={stopHunting}
          >
            STOP
          </button>
        </div>
        </>}
        {
          !hunting &&
          (<>
          <button
          className='hover:-translate-y-1 hover:text-whitish hover:scale-110 fixed bottom-[10%] right-[50%] translate-x-1/2 transition ease-in-out delay-150
          w-[200px] h-[84px] bg-accent text-primary font-bold hover:font-bold text-[28px] rounded-[5px]'
          onClick={hunt}
          >
          HUNT
          </button>
          </>)
        }
        
        {
        tripFound &&
        
        <div className="w-[450px] h-[280px] bg-primary text-whitish z-40 absolute top-[75%] left-[50%] transform -translate-x-1/2 drop-shadow-md z-50	-translate-y-1/2 rounded-[20px]">
          <img src={profileImg} className='fixed top-[13%] h-[60px] left-[5%]' />
          <ul className='w-[400px] h-[200px] text-whitish fixed top-[10%] left-[10%] font-bold'>
            <li className='relative ml-16 text-[16px] mt-2'>Name</li>
            <li className='relative ml-16 text-[16px] mt-2'>Pickup Address</li>
            <li className='relative ml-16 text-[16px] mt-2'>Dropoff Address</li>
            <li className='relative ml-16 text-[16px] mt-2'>Duration</li>
            <li className='relative ml-16 text-[16px] mt-2'>Price</li>
          </ul>
          <img src={filledStar} className='h-[30px] fixed right-[18%] top-[12%]' />
          <p className='h-[40px] fixed right-[11%] top-[13%] text-[18px]'>4.5</p>
          <button className='hover:-translate-y-1 hover:text-whitish hover:scale-110 fixed bottom-[10%] left-[10%] transition ease-in-out delay-150 w-[120px] h-[50px] bg-accent text-primary font-bold hover:font-bold text-[18px] rounded-[5px]'>
            DECLINE
          </button>
          <button className='hover:-translate-y-1 hover:text-whitish hover:scale-110 fixed bottom-[10%] right-[10%] transition ease-in-out delay-150 w-[120px] h-[50px] bg-accent text-primary font-bold hover:font-bold text-[18px] rounded-[5px]'>
            ACCEPT
          </button>
        </div>
        }
      </div>
    </>
  );
};

export default TripHuntingPage;
