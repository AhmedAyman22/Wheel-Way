import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import MapView from '../components/MapView';
import profileIcon from '../assets/images/profile-icon.png'
import compass from '../assets/images/compass.png';
import RatingReview from '../components/RatingBar';



const RiderOngoing = () => {
    const location = useLocation();
    const tripData = location.state?.data;
    const [selectedRide, setSelectedRide] = useState(null);
    const [tripStarted, setTripStarted] = useState(true);
    const [tripEnded, setTripEnded] = useState(true);
    const [rating, setRating] = useState(0);


    const googleMapsNav = () => {
        const url = `https://www.google.com/maps/dir/${tripData.pickupLat},${tripData.pickupLng}/${tripData.dropoffLat},${tripData.dropoffLng}`;
        window.open(url, '_blank');
      };
    
    useEffect(() => {
        if (tripData) {
          setSelectedRide(selectedRide === null ? {} : null);
        } else {
          console.log('No data passed. Handle the error or fallback logic here.');
        }
      }, [tripData]);

      useEffect(() => {
        if (rating > 0) {
          handleRatingUpdate();
        }
      }, [rating]);

    console.log('tripData:', tripData);
    const coords = {
        pickupLat: tripData.pickupLat,
        pickupLng: tripData.pickupLng,
        dropoffLat: tripData.dropoffLat,
        dropoffLng: tripData.dropoffLng,
      };
    const handleRatingUpdate = () => {
        console.log('Rating updated to:', rating);
        // Add your custom logic here, for example:
        // Send the rating to the server
        // axios.post('/api/rating', { rating, tripId: tripData.id });
      };
    return (
    <>
        {!tripStarted &&(
            <>
            <div className="w-[25%] h-[50%] bg-primary text-whitish z-40 absolute top-[22%] left-[3%] transform drop-shadow-md z-50 rounded-[20px]">
            <p className='text-[24px] top-[5%] text-bold left-[7%] relative font-bold'>Please head to the pickup location!</p>
            <p className='text-[24px] text-bold top-[10%] left-[5%] relative'>You're riding with:</p>
            <img src={profileIcon} className='select-none relative top-[14%] h-[60px] left-[5%]' alt="Profile Icon"/>
            <p className='text-[16px] text-bold top-[18%] left-[6%] relative'>Name:</p>
            <p className='text-[16px] text-bold top-[20%] left-[6%] relative'>Mobile Number: </p>
            <p className='text-[16px] text-bold top-[22%] left-[6%] relative'>Pickup: {tripData.Pickup}</p>
            <p className='text-[16px] text-bold top-[24%] left-[6%] relative'>Dropoff: {tripData.Dropoff}</p>
            <p className='text-[16px] text-bold top-[26%] left-[6%] relative'>Estimate Time of Arrival: {tripData.Duration}</p>
          </div>
            </>
        )
        }
        {tripStarted && !tripEnded &&(
            <>
            <div className="w-[25%] h-[70%] bg-primary text-whitish z-40 absolute top-[22%] left-[3%] transform drop-shadow-md z-50 rounded-[20px]">
            <p className='text-[24px] top-[5%] text-bold left-[7%] relative font-bold'>Thanks for trusting WheelWay! <br></br>Please sit tight until you reach your destination</p>
            <p className='text-[22px] text-bold top-[10%] left-[5%] relative'>You're riding with:</p>
            <img src={profileIcon} className='select-none relative top-[12%] h-[60px] left-[5%]' alt="Profile Icon"/>
            <p className='text-[16px] text-bold top-[16%] left-[6%] relative'>Name:</p>
            <p className='text-[16px] text-bold top-[18%] left-[6%] relative'>Mobile Number: </p>
            <p className='text-[16px] text-bold top-[20%] left-[6%] relative'>Pickup: {tripData.Pickup}</p>
            <p className='text-[16px] text-bold top-[22%] left-[6%] relative'>Dropoff: {tripData.Dropoff}</p>
            <p className='text-[16px] text-bold top-[24%] left-[6%] relative'>Estimate Time of Arrival: {tripData.Duration}</p>
            <p className='text-[22px] top-[26%] text-bold left-[6%] relative font-bold'>Track the ride on google maps?</p>
            <div className='relative left-[80%] top-[19%] cursor-pointer w-[55px] h-[55px] rounded-[50%]'>
            <img 
                src={compass}
                className='w-[100%] h-[100%] cursor-pointer hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 hover:bg-opacity-85'
                onClick={googleMapsNav}
                alt="Compass Icon"
            />
            </div>
          </div>
            </>
        )
        }
        {tripStarted && tripEnded &&(
            <>
            <div className="w-[25%] h-[50%] bg-primary text-whitish z-40 absolute top-[30%] left-[50%] -translate-x-1/2 transform drop-shadow-md z-50 rounded-[20px] p-4">
              <p className='text-[20px] font-bold items-center justify-center font-bold mb-3'>Please wait for your driver to help you out<br></br> of the vehicle</p>
              <p className='text-[16px] mb-2'>Pickup: {tripData.Pickup}</p>
              <p className='text-[16px] mb-2'>Dropoff: {tripData.Dropoff}</p>
              <p className='text-[16px] mb-2'>Trip Price: {tripData.Price} EGP</p>
              <p className='text-[18px] font-bold items-center justify-center mt-2 mb-2'>Please rate your driver to help us enhance your experience in the future.</p>
              <RatingReview rating={rating} setRating={setRating} />
              <button
                onClick='{}'
                className='bg-accent w-full h-[10%] text-primary relative top-[5%] text-[26px] font-bold transform transition ease-in-out delay-150 drop-shadow-md z-50 rounded-[5px] hover:-translate-y-1/4 hover:text-whitish mt-4'>
                  FINISH
              </button>
            </div>
            <div className='h-[75%] w-[65%] fixed left-[50%] -translate-x-1/2 top-[22%] shadow-2xl rounded-[50px]'>
            <MapView coordinates={coords} key={JSON.stringify(selectedRide)} />
        </div>
          </>
        )
        }
        {!tripEnded &&(
        <div className='h-[75%] w-[65%] fixed left-[30%] top-[22%] shadow-2xl rounded-[50px]'>
            <MapView coordinates={coords} key={JSON.stringify(selectedRide)} />
        </div>
        )}
        
    </>
  );
};

export default RiderOngoing;
