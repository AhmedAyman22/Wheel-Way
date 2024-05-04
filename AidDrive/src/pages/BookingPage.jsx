// Geocode.setApiKey('AIzaSyCvOjfMLwSmSFmcOMAc6TRMeeLIg6-Q2WI');

import React, { useState, useEffect } from 'react';
import {Geocode, setKey} from 'react-geocode';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import basicRide from '../assets/images/basicRide_icon.png';
import vanRide from '../assets/images/vanRide_icon.png';
import vipRide from '../assets/images/vipRide_icon.png';
import arrowRight from '../assets/images/arrow_right.png';
import MyMapComponent from '../components/MapView'; 

var basicStyling = 'relative w-[400px] h-[100px] bg-secondary rounded-[5px] top-[40px] left-[50px] drop-shadow-md cursor-pointer hover:bg-accent hover:-translate-y-1'
var vanStyling = 'relative w-[400px] h-[100px] bg-secondary rounded-[5px] top-[40px] left-[50px] drop-shadow-md mt-[25px] cursor-pointer hover:bg-accent hover:-translate-y-1'
var vipStyling = 'relative w-[400px] h-[100px] bg-secondary rounded-[5px] top-[40px] left-[50px] drop-shadow-md mt-[25px] cursor-pointer hover:bg-accent hover:-translate-y-1'

const apiKey = 'AIzaSyCvOjfMLwSmSFmcOMAc6TRMeeLIg6-Q2WI';
setKey(apiKey);

const BookingPage = () => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupCoordinates, setPickupCoordinates] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [dropoffCoordinates, setDropoffCoordinates] = useState('');
  var RideClass = 'Default'

  const BasicClass = () => {
    RideClass = 'BasicClass'
    getClass();

  };
  const VanClass = () => {
    RideClass = 'VanClass'
    getClass();
  };
  const VipClass = () => {
    RideClass = 'VipClass'
    getClass();
  };
  const getClass = ()=>{
    console.log(RideClass)
  }

  const fetchCoordinates = async (address, setter) => {
    try {
      var geocoder = new google.maps.Geocoder();
      console.log('address',address.label)
      geocoder.geocode( { 'address': address.label}, function(results, status) {
      console.log('status',status)
      var lat = results[0].geometry.location.lat();
      var lon = results[0].geometry.location.lng();
      setter({ lat, lon });
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
    console.log('Pickup Address:', pickupAddress);
    console.log('Pickup Coordinates:', pickupCoordinates);
    console.log('Dropoff Address:', dropoffAddress);
    console.log('Dropoff Coordinates:', dropoffCoordinates);
  };
  const userLocation = { lat: 31.2357, lng: 30.0444 };
  return (
    <>
      <div>
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
     <div className='h-[600px] w-[500px] drop-shadow-lg  relative bottom-[435px] left-[570px] inline-block rounded-[20px] bg-accent'>
     <MyMapComponent  userLocation={userLocation}/></div>
     </div>
      </div>
    </>
  );
}

export default BookingPage;
