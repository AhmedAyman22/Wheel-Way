import React, { useState, useEffect } from 'react';
import {Geocode, setKey} from 'react-geocode';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import basicRide from '../assets/images/basicRide_icon.png';
import vanRide from '../assets/images/vanRide_icon.png';
import vipRide from '../assets/images/vipRide_icon.png';
import arrowRight from '../assets/images/arrow_right.png';
import MapView, { distanceinKM, tripDurationinMins } from '../components/MapView'; 
import uniqid from 'uniqid';


const apiKey = 'AIzaSyCvOjfMLwSmSFmcOMAc6TRMeeLIg6-Q2WI';
setKey(apiKey);


const BookingPage = () => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupCoordinates, setPickupCoordinates] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [dropoffCoordinates, setDropoffCoordinates] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [blurOverlay, setBlurOverlay] = useState(false);
  const [id,setID] = useState('');
  const [tripDetails, setTripDetails] = useState({});


  const BasePrice = 13;
  const KMPrice = 4;
  const minutePrice = .5;
  const minimumPrice = 16;
  var multiplier = 1;

  var tripDuration = 0;
  var tripDistance = 0;
  var tripPrice = 0;

  var RideClass = 'Default'

  const BasicClass = () => {
    multiplier = 1
    RideClass = 'BasicClass'
  };
  const VanClass = () => {
    multiplier = 1.25
    RideClass = 'VanClass'
  };
  const VipClass = () => {
    multiplier = 1.5
    RideClass = 'VipClass'
  };


  const fetchCoordinates = async (address, setter) => {
    try {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': address.label}, function(results, status) {
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

  const confirmTrip   = () =>{
    setIsPopupOpen(false);
    setBlurOverlay(false);
  }
  const handlePickupChange = (e) => {
    setPickupAddress(e.target.value);
  };
  

  const handleDropoffChange = (e) => {
    setDropoffAddress(e.target.value);
  };

  const handleConfirm = () => {
    if(RideClass == 'Default'){
      alert('Please Choose a Ride Class!');
    }
    else{      
      if(RideClass != 'Default'){
        setSelectedRide(selectedRide === null ? {} : null);
        tripDuration = parseFloat(tripDurationinMins.split(' ')[0]);
        tripDistance = parseFloat(distanceinKM.split(' ')[0]);
        tripDuration = parseFloat(tripDuration.toFixed(2));
        tripDistance = parseFloat(tripDistance.toFixed(2));
        console.log('tripDistance',tripDistance);
        tripPrice = (BasePrice + (KMPrice*tripDistance) + (minutePrice+tripDuration)) * multiplier;
        if(tripPrice<minimumPrice){tripPrice = minimumPrice;};
        var newID = uniqid('Trip_')
        var rideClass = '';
        if(RideClass == 'BasicClass'){
          rideClass  = 'Basic';
        
        }
        else if (RideClass == 'VanClass'){
          rideClass  = 'Van';
        }
        else if (RideClass == 'VipClass'){
          rideClass  = 'VIP';
        };
        const updatedTripDetails = {
          ...tripDetails,
          [newID]: {
            Class: rideClass,
            Duration: tripDurationinMins,
            Distance: tripDistance,
            Price: tripPrice,
            Date: Date(),
          },
        };
        setID(newID);
        setTripDetails(updatedTripDetails);
        enablePopup();
      }

    }

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
  return (
    <>
      <div className='w-[100%] h-[100%] z-10'>
        <h1 className='text-[36px] font-bold flex items-center justify-center h-auto sm:text-[48px] mt-[30px] text-primary'>BOOK A TRIP</h1>
        <div className='absolute left-[280px] top-[250px] w-[350px] h-[450px] bg-whitish rounded-[20px] inline-block drop-shadow-lg '>
          <h2 className='text-[28px] font-bold flex items-center justify-center h-auto sm:text-[36px] mt-[30px] text-primary'>Find a trip</h2>
          <div className='border-[1px] border-accent rounded-[5px] w-[300px] h-[40px] m-[10px] relative left-[10px] top-[30px] text-[14px] '>
            <GooglePlacesAutocomplete
            query={{key: apiKey}}
            autocompletionRequest={{
              componentRestrictions: {
                country: ['eg'],
              }
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
              }
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
          <button className='inline-block w-[130px] h-[50px] bg-accent rounded-[5px] drop-shadow-lg relative top-[75px] left-[110px] font-bold text-[20px] text-primary hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 hover:text-whitish' onClick={handleConfirm}>CONFIRM</button>
        </div>

        <div className='h-[600px] w-[500px] bg-whitish drop-shadow-lg rounded-[20px] absolute top-[250px] left-[700px] inline-block '>
     <h3 className='text-[36px] font-bold flex items-center justify-center h-auto sm:text-[36px] mt-[30px] text-primary' >Choose a Ride</h3>

     <a draggable="false" href="#" className= {'inline-block relative w-[400px] h-[100px] bg-secondary rounded-[5px] top-[40px] left-[50px] drop-shadow-md cursor-pointer hover:bg-accent hover:-translate-y-1 focus:-translate-y-1 focus:bg-accent focus:ring-2 focus:ring-black'} onClick={BasicClass}>
     <h4 className='font-bold text-[24px] relative left-[150px] top-[10px] inline-block text-primary'>Basic Ride</h4>
     <img src={basicRide} draggable="false" className='h-[40px] relative right-[110px] top-[30px] inline-block' />
     <p className='text-[14px] relative left-[150px] inline-block text-primary'>Basic car with a special-needs <br></br>trained driver</p>
     <a><img src={arrowRight} draggable="false" className='h-[30px] relative 	 left-[170px] bottom-[20px] inline-block' /></a>
    </a>

     <a href="#" draggable="false" className={'inline-block relative w-[400px] h-[100px] bg-secondary rounded-[5px] top-[40px] left-[50px] drop-shadow-md cursor-pointer mt-[25px] hover:bg-accent focus:bg-accent focus:-translate-y-1 hover:-translate-y-1 focus:ring-2  focus:ring-black'} onClick={VanClass}>
     <h4 className='font-bold text-[24px] relative left-[150px] inline-block text-primary'>Van Ride</h4>
     <img src={vanRide} draggable="false" className=' h-[40px] relative right-[75px] top-[30px] inline-block' />
     <p className='text-[14px] relative top-[45px] right-[45px] inline-block text-primary'>Van car with a special-needs<br></br>trained driver</p>
     <a><img src={arrowRight} draggable="false" className='h-[30px] relative left-[355px] bottom-[15px] inline-block' /></a>
     </a>
     
     

     <a href="#" draggable="false"  className={'inline-block relative w-[400px] h-[100px] bg-secondary rounded-[5px] top-[40px] left-[50px] drop-shadow-md cursor-pointer mt-[25px] hover:bg-accent focus:bg-accent focus:-translate-y-1 hover:-translate-y-1 focus:ring-2 focus:ring-black'} onClick={VipClass}>
     <h4 className='font-bold text-[24px] relative left-[150px] top-[10px] inline-block text-primary'>VIP Van Ride</h4>
     <img src={vipRide} draggable="false" className='h-[40px] relative right-[120px] top-[30px] inline-block'/>
     <p className='text-[14px] relative left-[150px] inline-block text-primary'>Van car with a special-needs<br></br>trained driver and a care-giver</p>
     <a><img src={arrowRight} draggable="false" className='h-[30px] relative left-[170px] bottom-[20px] inline-block cursor:pointer' /></a>
     
     </a>
     

     <div className='h-[600px] w-[500px] drop-shadow-lg  relative bottom-[435px] left-[570px] inline-block rounded-[20px] bg-accent'>
     
     <MapView coordinates={coords} key={JSON.stringify(selectedRide)} />
     
     </div>
     
     </div>
     
    </div>
    <div className='z-50'>
      { blurOverlay && (
  <div
    id="overlay"
    className={'z-50 filter blur-[200px] bg-whitish opacity-60 w-screen h-screen'}
  ></div>
)}
{isPopupOpen && (
        <div className="w-[400px] h-[400px] bg-primary text-whitish z-40 absolute top-[50%] left-[50%] transform -translate-x-1/2 drop-shadow-md z-50	-translate-y-1/2 rounded-[20px]">
          <h3 className='text-[20px] font-bold flex items-center justify-center h-auto sm:text-[30px] mt-[30px] text-whitish ' >CONFIRM TRIP?</h3>
          <h3 className='text-[20px] font-bold ml-[15px] h-auto sm:text-[20px] mt-[15px] text-whitish ' >Trip Details:</h3>
          <ul className='w-[400px] h-[200px] text-whitish font-bold mt-[20px]'>
            <li className='relative left-[40px] mt-5 '>Ride Class: {tripDetails[id].Class}</li>
            <li className='relative left-[40px] mt-5'>Trip Distance: {tripDetails[id].Distance}KM</li>
            <li className='relative left-[40px] mt-5'>Trip Duration: {tripDetails[id].Duration}</li>
            <li className='relative left-[40px] mt-5'>Total Price: {tripDetails[id].Price} EGP</li>
          </ul>
          <button className='h-[60px] w-[120px] bg-accent rounded-[10px] drop-shadow-md text-[20px] relative inline-block left-[200px] -translate-x-1/2 -translate-y-1/2 text-primary font-bold ' onClick={confirmTrip}>CONFIRM</button>
        </div>
    )}
</div>  
    </>
  );
}

export default BookingPage;