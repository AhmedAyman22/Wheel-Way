import React, { useState, useEffect, useContext } from 'react';
  import { Geocode, setKey } from 'react-geocode';
  import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
  import basicRide from '../assets/images/basicRide_icon.png';
  import vanRide from '../assets/images/vanRide_icon.png';
  import vipRide from '../assets/images/vipRide_icon.png';
  import arrowRight from '../assets/images/arrow_right.png';
  import MapView, { distanceinKM, tripDurationinMins } from '../components/MapView';
  import uniqid from 'uniqid';
  import axios from 'axios';
  import { UserContext } from './userinfo';
  import { useNavigate } from 'react-router-dom';
  import accentBack from '../assets/images/accent-back.png';
  import { TailSpin } from 'react-loader-spinner';
  import TripHuntingPage from './TripHuntingPage';
  import { useLocation } from 'react-router-dom';

  
  const apiKey = 'AIzaSyCvOjfMLwSmSFmcOMAc6TRMeeLIg6-Q2WI'; // Replace with your actual API key
  setKey(apiKey);
  
  const BookingPage = () => {
    const [userId, setUserId] = useState(null); // State to store userId
    const [username, setUsername] = useState(null);  
    const [pickupAddress, setPickupAddress] = useState('');
    const [pickupCoordinates, setPickupCoordinates] = useState('');
    const [dropoffAddress, setDropoffAddress] = useState('');
    const [dropoffCoordinates, setDropoffCoordinates] = useState('');
    const [selectedRide, setSelectedRide] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [blurOverlay, setBlurOverlay] = useState(false);
    const [id, setID] = useState('');
    const [findingDriver, setFindingDriver] = useState(false);
    const [tripDetails, setTripDetails] = useState({});
    const [rideClass, setRideClass] = useState('Default');
    const [multiplier, setMultiplier] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state || {};
    const founddriver = state.founddriver || false;
    const BasePrice = 13;
    const KMPrice = 4;
    const minutePrice = 0.5;
    const minimumPrice = 16;
  
    let tripDuration = 0;
    let tripDistance = 0;
    let tripPrice = 0;
  
    const BasicClass = () => {
      setMultiplier(1);
      setRideClass('BasicClass');
      console.log('RideClass:', 'BasicClass');
    };
    const VanClass = () => {
      setMultiplier(1.25);
      setRideClass('VanClass');
      console.log('RideClass:', 'VanClass');
    };
    const VipClass = () => {
      setMultiplier(1.5);
      setRideClass('VipClass');
      console.log('RideClass:', 'VipClass');
    };
    useEffect(() => {
      // Fetch userId from session when component mounts
      fetchUserId();
    }, []);

    const fetchUserId = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/userid', { withCredentials: true });
        setUserId(response.data.userId);
        setUsername (response.data.username);
      } catch (error) {
        console.error('Error fetching userId:', error);
      }
    };

    const fetchCoordinates = async (address, setter) => {
      try {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address.label }, function (results, status) {
          var lat = results[0].geometry.location.lat();
          var lng = results[0].geometry.location.lng();
          setter({ lat, lng });
        });
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };
  
    useEffect(() => {
      if (pickupAddress) {
        fetchCoordinates(pickupAddress, setPickupCoordinates);
      }
    }, [pickupAddress]);
  
    useEffect(() => {
      if (dropoffAddress) {
        fetchCoordinates(dropoffAddress, setDropoffCoordinates);
      }
    }, [dropoffAddress]);
 

  
    const handlePickupChange = (e) => {
      setPickupAddress(e.target.value);
    };
  
    const handleDropoffChange = (e) => {
      setDropoffAddress(e.target.value);
    };
  
     const handleConfirm = () => {
      if (rideClass === 'Default') {
        alert('Please Choose a Ride Class!');
      } else {
        setSelectedRide(selectedRide === null ? {} : null);
        if (rideClass !== 'Default') {
          tripDuration = parseFloat(tripDurationinMins.split(' ')[0]);
          tripDistance = parseFloat(distanceinKM.split(' ')[0]);
          tripDuration = parseFloat(tripDuration.toFixed(2));
          tripDistance = parseFloat(tripDistance.toFixed(2));
          tripPrice = (BasePrice + KMPrice * tripDistance + minutePrice * tripDuration) * multiplier;
          if (tripPrice < minimumPrice) {
            tripPrice = minimumPrice;
          }
          const newID = uniqid('Trip_');
          const rideClassName = rideClass.toLowerCase().replace('class', '');
          const updatedTripDetails = {
            ...tripDetails,
            [newID]: {
              pickupLat: pickupCoordinates?.lat,
              pickupLng: pickupCoordinates?.lng,
              dropoffLat: dropoffCoordinates?.lat,
              dropoffLng: dropoffCoordinates?.lng,
              Pickup: pickupAddress.label,
              Dropoff: dropoffAddress.label,
              Class: rideClassName,
              Duration: tripDurationinMins,
              Distance: tripDistance,
              Price: tripPrice,
              Date: new Date().toISOString().slice(0, 19).replace('T', ' '), // Correct date format for MySQL
              Status: 'pending',
              driverLat: 0,
              driverLng: 0,
              userid: userId, // Pass userId from context
              rideid: newID

            },
          };
          setID(newID);
          setTripDetails(updatedTripDetails);
          enablePopup();

        }
      }
    };
    
    const confirmTrip = async (event) => {
      // setIsPopupOpen(false);
      // setBlurOverlay(false);
      const tripDetail = tripDetails[id];
      try {
        const response = await axios.post('http://localhost:3001/booking/booking', tripDetail,{ withCredentials: true });
        console.log(findDriver);
        findDriver()
        var container = {
          data: tripDetail,
        };
      } catch (error) {
        console.error('There was an error with your booking:', error);
      }
    };
    
  
    const disablePopup = () => {
      setIsPopupOpen(false);
      setBlurOverlay(false);
    };
    const enablePopup = () => {
      setIsPopupOpen(true);
      setBlurOverlay(true);
    };
  
    const coords = {
      pickupLat: pickupCoordinates?.lat,
      pickupLng: pickupCoordinates?.lng,
      dropoffLat: dropoffCoordinates?.lat,
      dropoffLng: dropoffCoordinates?.lng,
    };
    const findDriver = () => {
      setFindingDriver(true);
      
      const intervalId = setInterval(async () => {
        try {
          console.log('dsadas',id);
          const response = await axios.get(`http://localhost:3001/trip-status?tripId=${id}`);
          if (response.data.status === 'accepted') {
            setFindingDriver(false);
            setIsPopupOpen(false);
            setBlurOverlay(false);
            setTripDetails({});
            clearInterval(intervalId); // Clear the interval once the trip is accepted
            navigate('/riderOngoing', { state: { data: tripDetails[id] } });
          }
        } catch (error) {
          console.error('Error fetching trip status:', error);
        }
      }, 2000);
    
      // Cleanup interval on component unmount or if the interval is no longer needed
      return () => clearInterval(intervalId);
    };
    
    
  
    const stopFindingDriver = () => {
      if(founddriver== true){
        setFindingDriver(false);
        setIsPopupOpen(false);
        setBlurOverlay(false);
        setTripDetails({});
        navigate('/riderOngoing', { state: container });
      }
  
    }
    return (
      <>
        <div className='w-[100%] h-[100%] z-10'>
          <h1 className='text-[36px] font-bold flex items-center justify-center h-auto sm:text-[48px] mt-[30px] text-primary'>
            BOOK A TRIP
          </h1>
          <p className="text-center text-primary font-bold mt-4">
            Welcome, {username}!
          </p>
          <div className='absolute left-[280px] top-[250px] w-[350px] h-[450px] bg-whitish rounded-[20px] inline-block drop-shadow-lg '>
            <h2 className='text-[28px] font-bold flex items-center justify-center h-auto sm:text-[36px] mt-[30px] text-primary'>Find a trip</h2>
            <div className='border-[1px] border-accent rounded-[5px] w-[300px] h-[40px] m-[10px] relative left-[10px] top-[30px] text-[14px] '>
              <GooglePlacesAutocomplete
                query={{ key: apiKey }}
                autocompletionRequest={{
                  componentRestrictions: {
                    country: ['eg'],
                  },
                }}
                selectProps={{
                  value: pickupAddress,
                  onChange: setPickupAddress,
                  style: {
                    placeholder: 'Pick-up Location...',
                  },
                }}
              />
            </div>
            <div className='border-[1px] border-accent rounded-[5px] w-[300px] h-[40px] m-[10px] relative left-[10px] top-[50px] text-[14px]'>
              <GooglePlacesAutocomplete
                apiKey={apiKey}
                autocompletionRequest={{
                  componentRestrictions: {
                    country: ['eg'],
                  },
                }}
                selectProps={{
                  value: dropoffAddress,
                  onChange: setDropoffAddress,
                  style: {
                    placeholder: 'Drop-off Location...',
                  },
                }}
              />
            </div>
            <button
              className='inline-block w-[130px] h-[50px] bg-accent rounded-[5px] drop-shadow-lg relative top-[75px] left-[110px] font-bold text-[20px] text-primary hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 hover:text-whitish'
              onClick={handleConfirm}
            >
              CONFIRM
            </button>
          </div>
  
          <div className='h-[600px] w-[500px] bg-whitish drop-shadow-lg rounded-[20px] absolute top-[250px] left-[700px] inline-block '>
            <h3 className='text-[36px] font-bold flex items-center justify-center h-auto sm:text-[36px] mt-[30px] text-primary'>Choose a Ride</h3>
  
            <a
              draggable='false'
              href='#'
              className={
                'inline-block relative w-[400px] h-[100px] bg-secondary rounded-[5px] top-[40px] left-[50px] drop-shadow-md cursor-pointer hover:bg-accent hover:-translate-y-1 focus:-translate-y-1 focus:bg-accent focus:ring-2 focus:ring-black'
              }
              onClick={BasicClass}
            >
              <h4 className='font-bold text-[24px] relative left-[150px] top-[10px] inline-block text-primary'>Basic Ride</h4>
              <img src={basicRide} draggable='false' className='h-[40px] relative right-[110px] top-[30px] inline-block' />
              <p className='text-[14px] relative left-[150px] inline-block text-primary'>
                Basic car with a special-needs <br />
                trained driver
              </p>
              <a>
                <img src={arrowRight} draggable='false' className='h-[30px] relative left-[170px] bottom-[20px] inline-block' />
              </a>
            </a>
  
            <a
              href='#'
              draggable='false'
              className={
                'inline-block relative w-[400px] h-[100px] bg-secondary rounded-[5px] top-[40px] left-[50px] drop-shadow-md cursor-pointer mt-[25px] hover:bg-accent focus:bg-accent focus:-translate-y-1 hover:-translate-y-1 focus:ring-2  focus:ring-black'
              }
              onClick={VanClass}
            >
              <h4 className='font-bold text-[24px] relative left-[150px] inline-block text-primary'>Van Ride</h4>
              <img src={vanRide} draggable='false' className=' h-[40px] relative right-[75px] top-[30px] inline-block' />
              <p className='text-[14px] relative top-[45px] right-[45px] inline-block text-primary'>
                Van car with a special-needs
                <br />
                trained driver
              </p>
              <a>
                <img src={arrowRight} draggable='false' className='h-[30px] relative left-[355px] bottom-[15px] inline-block' />
              </a>
            </a>
  
            <a
              href='#'
              draggable='false'
              className={
                'inline-block relative w-[400px] h-[100px] bg-secondary rounded-[5px] top-[40px] left-[50px] drop-shadow-md cursor-pointer mt-[25px] hover:bg-accent focus:bg-accent focus:-translate-y-1 hover:-translate-y-1 focus:ring-2 focus:ring-black'
              }
              onClick={VipClass}
            >
              <h4 className='font-bold text-[24px] relative left-[150px] top-[10px] inline-block text-primary'>VIP Van Ride</h4>
              <img src={vipRide} draggable='false' className='h-[40px] relative right-[120px] top-[30px] inline-block' />
              <p className='text-[14px] relative left-[150px] inline-block text-primary'>
                Van car with a special-needs
                <br />
                trained driver and a care-giver
              </p>
              <a>
                <img src={arrowRight} draggable='false' className='h-[30px] relative left-[170px] bottom-[20px] inline-block cursor:pointer' />
              </a>
            </a>
  
            <div className='h-[600px] w-[500px] drop-shadow-lg  relative bottom-[435px] left-[570px] inline-block rounded-[20px] bg-accent'>
              <MapView coordinates={coords} key={JSON.stringify(selectedRide)} />
            </div>
          </div>
        </div>
        <div className='z-50'>
          {blurOverlay && (
            <div id='overlay' className={'z-50 filter blur-[200px] bg-whitish opacity-60 w-screen h-screen'}></div>
          )}
          {isPopupOpen && !findingDriver && (
            <div className='w-[400px] h-[400px] bg-primary text-whitish z-40 absolute top-[50%] left-[50%] transform -translate-x-1/2 drop-shadow-md z-50	-translate-y-1/2 rounded-[20px]'>
              <img 
              src={accentBack} 
              className='fixed left-[88%] top-[2%] cursor-pointer hover:-translate-y-1 transition ease-in-out duration-300  '
              onClick={disablePopup}
              draggable='false' />
              <h3 className='text-[20px] font-bold flex items-center justify-center h-auto sm:text-[30px] mt-[30px] text-whitish '>CONFIRM TRIP?</h3>
              <h3 className='text-[20px] font-bold ml-[15px] h-auto sm:text-[20px] mt-[15px] text-whitish '>Trip Details:</h3>
              <ul className='w-[400px] h-[200px] text-whitish font-bold mt-[20px]'>
                <li className='relative left-[40px] mt-5 '>Ride Class: {tripDetails[id]?.Class}</li>
                <li className='relative left-[40px] mt-5'>Trip Distance: {tripDetails[id]?.Distance}KM</li>
                <li className='relative left-[40px] mt-5'>Trip Duration: {tripDetails[id]?.Duration}</li>
                <li className='relative left-[40px] mt-5'>Total Price: {tripDetails[id]?.Price} EGP</li>
              </ul>
              <button
                className='h-[60px] w-[120px] bg-accent rounded-[10px] drop-shadow-md text-[20px] relative inline-block left-[200px] -translate-x-1/2 -translate-y-1/2 text-primary font-bold '
                onClick={confirmTrip}>
                CONFIRM
              </button>
            </div>
          )}
           {blurOverlay && <div className="fixed inset-0 bg-black opacity-50 z-20"></div>}
        {isPopupOpen && (
          <div className='fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] w-[400px] h-[400px] bg-white rounded-[20px] shadow-lg flex flex-col items-center justify-center z-30'>
            {findingDriver && !founddriver && <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="tail-spin-loading" radius="1" visible={true} />}
            {founddriver && (
              <>
                <h2 className='text-[24px] font-bold mb-[20px] text-primary'>Driver Found!</h2>
                <p className='text-[16px] text-primary'>Your driver is on the way.</p>
                <button
                  onClick={confirmTrip}
                  className='mt-[20px] px-[20px] py-[10px] bg-accent text-white rounded-[10px] text-[16px] font-bold cursor-pointer'
                >
                  Confirm
                </button>
              </>
            )}
            {!findingDriver && !founddriver && (
              <h2 className='text-[24px] font-bold mb-[20px] text-primary'>Finding a driver...</h2>
            )}
            <button
              onClick={stopFindingDriver}
              className='mt-[20px] px-[20px] py-[10px] bg-red-600 text-white rounded-[10px] text-[16px] font-bold cursor-pointer'
            >STOP
              </button>
            </div>
          )}
        </div>
      </>
    );
  };
  
  export default BookingPage;