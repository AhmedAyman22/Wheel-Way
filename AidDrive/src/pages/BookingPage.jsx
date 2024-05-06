/*
'AIzaSyCvOjfMLwSmSFmcOMAc6TRMeeLIg6-Q2WI'
*/

import React, { useState, useEffect } from 'react';
import {Geocode, setKey} from 'react-geocode';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import basicRide from '../assets/images/basicRide_icon.png';
import vanRide from '../assets/images/vanRide_icon.png';
import vipRide from '../assets/images/vipRide_icon.png';
import arrowRight from '../assets/images/arrow_right.png';
import MapView, { distanceinKM, tripTimeinMins } from '../components/MapView'; 
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const apiKey = 'AIzaSyCvOjfMLwSmSFmcOMAc6TRMeeLIg6-Q2WI';
setKey(apiKey);


const BookingPage = () => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupCoordinates, setPickupCoordinates] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [dropoffCoordinates, setDropoffCoordinates] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const BasePrice = 13;
  const KMPrice = 4;
  const minutePrice = .5;
  const minimumPrice = 16;
  var multiplier = 1;



  var RideClass = 'Default'

  const BasicClass = () => {
    multiplier = 1
    RideClass = 'BasicClass'
    getClass();
    if(tripPrice<minimumPrice){tripPrice = minimumPrice;}
  };
  const VanClass = () => {
    multiplier = 1.25
    RideClass = 'VanClass'
    getClass();
  };
  const VipClass = () => {
    multiplier = 1.5
    RideClass = 'VipClass'
    getClass();
  };
  const getClass = ()=>{
    console.log(RideClass)
  }

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


  const handlePickupChange = (e) => {
    setPickupAddress(e.target.value);
  };
  

  const handleDropoffChange = (e) => {
    setDropoffAddress(e.target.value);
  };

  const handleConfirm = () => {
    // Assuming you want to rerender MapView when confirming
    setSelectedRide(selectedRide === null ? {} : null);
    var tripTime = parseFloat(tripTimeinMins.split(' ')[0])
    var tripDistance = parseFloat(distanceinKM.split(' ')[0])
    tripTime = parseFloat(tripTime.toFixed(2))
    tripDistance = parseFloat(tripDistance.toFixed(2))
    if(RideClass == 'Default'){
      setIsPopupOpen(true);
      console.log('isPopupOpen',isPopupOpen);
    }
    else{
      var tripPrice = (BasePrice + (KMPrice*tripDistance) + (minutePrice+tripTime)) * multiplier;
      console.log('Distance:',tripDistance);
      console.log('Time:',tripTime);
      console.log('Price:',tripPrice);
      console.log('Trip Class:',RideClass);
      console.log('multiplier:',multiplier);
    }
    
  };

  const coords = {
    pickupLat: pickupCoordinates?.lat,
    pickupLng: pickupCoordinates?.lng,
    dropoffLat: dropoffCoordinates?.lat,
    dropoffLng: dropoffCoordinates?.lng,
  };

  return (
    <>
      <div className='w-[100%] h-[100%]'>
        <h1 className='text-[36px] font-bold flex items-center justify-center h-auto sm:text-[48px] mt-[30px] text-primary'>BOOK A TRIP</h1>
        <div className='absolute left-[280px] top-[250px] w-[350px] h-[450px] bg-whitish rounded-[20px] inline-block drop-shadow-lg'>
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
     <a href="#" className= {'inline-block relative w-[400px] h-[100px] bg-secondary rounded-[5px] top-[40px] left-[50px] drop-shadow-md cursor-pointer hover:bg-accent hover:-translate-y-1 focus:-translate-y-1 focus:bg-accent focus:ring-2 focus:ring-black'} onClick={BasicClass}>
     <h4 className='font-bold text-[24px] relative left-[150px] top-[10px] inline-block text-primary'>Basic Ride</h4>
     <img src={basicRide} className='h-[40px] relative right-[110px] top-[30px] inline-block' />
     <p className='text-[14px] relative left-[150px] inline-block text-primary'>Basic car with a special-needs <br></br>trained driver</p>
     <a><img src={arrowRight} className='h-[30px] relative left-[170px] bottom-[20px] inline-block' /></a>
    </a>

     <a href="#" className={'inline-block relative w-[400px] h-[100px] bg-secondary rounded-[5px] top-[40px] left-[50px] drop-shadow-md cursor-pointer mt-[25px] hover:bg-accent focus:bg-accent focus:-translate-y-1 hover:-translate-y-1 focus:ring-2  focus:ring-black'} onClick={VanClass}>
     <h4 className='font-bold text-[24px] relative left-[150px] inline-block text-primary'>Van Ride</h4>
     <img src={vanRide} className='h-[40px] relative right-[75px] top-[30px] inline-block' />
     <p className='text-[14px] relative top-[45px] right-[45px] inline-block text-primary'>Van car with a special-needs<br></br>trained driver</p>
     <a><img src={arrowRight} className='h-[30px] relative left-[355px] bottom-[15px] inline-block' /></a>
     </a>
     
     <a href="#"  className={'inline-block relative w-[400px] h-[100px] bg-secondary rounded-[5px] top-[40px] left-[50px] drop-shadow-md cursor-pointer mt-[25px] hover:bg-accent focus:bg-accent focus:-translate-y-1 hover:-translate-y-1 focus:ring-2 focus:ring-black'} onClick={VipClass}>
     <h4 className='font-bold text-[24px] relative left-[150px] top-[10px] inline-block text-primary'>VIP Van Ride</h4>
     <img src={vipRide} className='h-[40px] relative right-[120px] top-[30px] inline-block'/>
     <p className='text-[14px] relative left-[150px] inline-block text-primary'>Van car with a special-needs<br></br>trained driver and a care-giver</p>
     <a><img src={arrowRight} className='h-[30px] relative left-[170px] bottom-[20px] inline-block cursor:pointer' /></a>
     </a>
     {isPopupOpen && (
        <div className="w-[400px] h-[100px] bg-accent text-whitish Z-50 absolute top-[50%] left-[50%] transform -translate-x-1/2 drop-shadow-md	-translate-y-1/2 rounded-[20px]">
          <h3 className='text-[20px] font-bold flex items-center justify-center h-auto sm:text-[20px] mt-[30px] text-primary' >YOU HAVE TO CHOOSE A RIDE CLASS</h3>
        </div>
    )}
     <div className='h-[600px] w-[500px] drop-shadow-lg  relative bottom-[435px] left-[570px] inline-block rounded-[20px] bg-accent'>
     <MapView coordinates={coords} key={JSON.stringify(selectedRide)} />
     </div>
     </div>
      </div>
    </>
  );
}

export default BookingPage;

