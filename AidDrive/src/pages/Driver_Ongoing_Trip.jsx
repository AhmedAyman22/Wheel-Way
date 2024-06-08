import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapView from '../components/MapView';
import RatingReview from '../components/RatingBar';
import { useLocation } from 'react-router-dom';
import profileIcon from '../assets/images/profile-icon.png';
import compass from '../assets/images/compass.png';

const DriverOngoingTrip = () => {
  const location = useLocation();
  const [selectedRide, setSelectedRide] = useState(null);
  const [metRider, setMetRider] = useState(false);
  const [tripEnd, setTripEnd] = useState(false);
  const [rating, setRating] = useState(0);
  const [userDetails, setUserDetails] = useState({ first_name: '', phone_number: '' });

  const tripData = location.state.data;
  const driverLat = location.state.driverLat;
  const driverLng = location.state.driverLng;
  const driverToRiderCoords = {
    pickupLat: driverLat,
    pickupLng: driverLng,
    dropoffLat: tripData.pickupLat,
    dropoffLng: tripData.pickupLng,
  };
  const coords = {
    pickupLat: tripData.pickupLat,
    pickupLng: tripData.pickupLng,
    dropoffLat: tripData.dropoffLat,
    dropoffLng: tripData.dropoffLng,
  };

  useEffect(() => {
    if (tripData) {
      setSelectedRide(selectedRide === null ? {} : null);
      if (tripData.user_id) {
        fetchUserDetails(tripData.user_id); // Fetch user details if user_id is available
      } else {
      }
    } else {
      console.log('No data passed. Handle the error or fallback logic here.');
    }
  }, [tripData]);

  useEffect(() => {
    if (rating > 0) {
      handleRatingUpdate();
    }
  }, [rating]);

  useEffect(() => {
    // Call fetchUserDetails when the component mounts
    fetchUserDetails(tripData.user_id); // Assuming tripData is available at mount
  }, []); // Empty dependency array ensures this effect runs only once, on mount

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/user/${userId}`); // Use the correct base URL
  
      if (response.data && typeof response.data === 'object') {
        setUserDetails(response.data); // Set user details received from backend
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  

  const startTrip = () => {
    setMetRider(true);
  };

  const endTrip = () => {
    setTripEnd(true);
  };

  const googleMapsNav = () => {
    const url = `https://www.google.com/maps/dir/${tripData.pickupLat},${tripData.pickupLng}/${tripData.dropoffLat},${tripData.dropoffLng}`;
    window.open(url, '_blank');
  };

 
  const handleRatingUpdate = async () => {
    try {
      const response = await axios.post('http://localhost:3001/completed-trip', {
        ride_id: tripData.ride_id,
        driver_id: tripData.driver_id,
        rating: rating,
      });
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  return (
    <>
      {!metRider && 
        <>
          <div className="w-[25%] h-[50%] bg-primary text-whitish z-40 absolute top-[22%] left-[3%] transform drop-shadow-md z-50 rounded-[20px]">
            <p className='text-[24px] top-[5%] text-bold left-[7%] relative font-bold'>Please head to your rider's location!</p>
            <p className='text-[24px] text-bold top-[10%] left-[5%] relative'>You're riding with:</p>
            <img src={profileIcon} className='select-none relative top-[14%] h-[60px] left-[5%]' alt="Profile Icon"/>
            <p className='text-[16px] text-bold top-[18%] left-[6%] relative'>Name: {userDetails.first_name}  {userDetails.last_name}</p>
            <p className='text-[16px] text-bold top-[20%] left-[6%] relative'>Mobile Number: {userDetails.phonenumber}</p>
            <p className='text-[16px] text-bold top-[22%] left-[6%] relative'>Pickup: {tripData.Pickup}</p>
            <p className='text-[16px] text-bold top-[24%] left-[6%] relative'>Dropoff: {tripData.Dropoff}</p>
            <button
              onClick={startTrip}
              className='bg-accent relative left-[50%] top-[30%] -translate-x-1/2 w-[70%] h-[10%] text-primary text-[26px] font-bold transform transition ease-in-out delay-150 drop-shadow-md z-50 rounded-[5px] hover:-translate-y-1/4 hover:text-whitish'>
              Start the trip
            </button>
          </div>
          <div className='h-[75%] w-[65%] fixed left-[30%] top-[22%] shadow-2xl rounded-[50px]'>
            <MapView coordinates={driverToRiderCoords} key={JSON.stringify(selectedRide)} />
          </div>
        </>
      }
      
      {metRider && !tripEnd &&
        <>
          <div className="w-[25%] h-[50%] bg-primary text-whitish z-40 absolute top-[22%] left-[3%] transform drop-shadow-md z-50 rounded-[20px]">
            <p className='text-[24px] top-[5%] text-bold left-[7%] relative font-bold'>Please drive safely to the destination</p>
            <p className='text-[24px] text-bold top-[10%] left-[5%] relative'>You're riding with:</p>
            <img src={profileIcon} className='select-none relative top-[14%] h-[55px] left-[5%]' alt="Profile Icon"/>
            <p className='text-[16px] text-bold top-[18%] left-[6%] relative'>Name: {userDetails.first_name}</p>
            <p className='text-[16px] text-bold top-[20%] left-[6%] relative'>Mobile Number: {userDetails.phonenumber}</p>
            <p className='text-[16px] text-bold top-[22%] left-[6%] relative'>Pickup: {tripData.Pickup}</p>
            <p className='text-[16px] text-bold top-[24%] left-[6%] relative'>Dropoff: {tripData.Dropoff}</p>
            <p className='text-[16px] text-bold top-[26%] left-[6%] relative'>Estimate Time of Arrival: {tripData.Duration}</p>
            <button 
              onClick={endTrip}
              className="group relative h-[12%] w-[70%] cursor-pointer overflow-hidden rounded-lg bg-secondary text-lg shadow top-[27.5%] left-[22%]">
                <div className="absolute inset-0 w-3 bg-accent cursor-pointer transition-all duration-[2s] ease-out group-hover:w-full"></div>
                <span className="relative text-[24px] text-primary font-bold cursor-pointer ">
                  END THE TRIP
                </span>
            </button>
            <div className='relative left-[7%] top-[15%] cursor-pointer w-[60px] h-[60px] rounded-[50%]'>
              <img 
                src={compass}
                className='w-[100%] h-[100%] cursor-pointer hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 hover:bg-opacity-85'
                onClick={googleMapsNav}
                alt="Compass Icon"
              />
            </div>
          </div>
          <div className='h-[75%] w-[65%] fixed left-[30%] top-[22%] shadow-2xl rounded-[50px]'>
            <MapView coordinates={coords} key={JSON.stringify(selectedRide)} />
          </div>
        </>
      }

      {tripEnd && 
        <>
          <div className="w-[25%] h-[50%] bg-primary text-whitish z-40 absolute top-[30%] left-[50%] -translate-x-1/2 transform drop-shadow-md z-50 rounded-[20px] p-4">
            <p className='text-[20px] font-bold items-center justify-center font-bold mb-2'>Please help your rider out of the vehicle</p>
            <p className='text-[16px] mb-2'>Pickup: {tripData.Pickup}</p>
            <p className='text-[16px] mb-2'>Dropoff: {tripData.Dropoff}</p>
            <p className='text-[16px] mb-2'>Trip Price: {tripData.Price} EGP</p>
            <p className='text-[18px] font-bold items-center justify-center mt-2 mb-2'>Please rate your rider to help us enhance your experience in the future.</p>
            <RatingReview rating={rating} setRating={setRating} />
            <button
              onClick= {handleRatingUpdate}
              className='bg-accent w-full h-[10%] text-primary relative top-[5%] text-[26px] font-bold transform transition ease-in-out delay-150 drop-shadow-md z-50 rounded-[5px] hover:-translate-y-1/4 hover:text-whitish mt-4'>
                FINISH
            </button>
          </div>
          <div className='h-[75%] w-[75%] fixed left-[50%] -translate-x-1/2 top-[22%] shadow-2xl rounded-[50px]'>
            <MapView coordinates={driverToRiderCoords} key={JSON.stringify(selectedRide)} />
          </div>
        </>
      }
    </>
  );
};

export default DriverOngoingTrip;
