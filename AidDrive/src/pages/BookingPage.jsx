// import React, { useState, useEffect } from 'react';
// import Geocode from 'react-geocode';
// import basicRide from '../assets/images/basicRide_icon.png';
// import vanRide from '../assets/images/vanRide_icon.png';
// import vipRide from '../assets/images/vipRide_icon.png';
// import arrowRight from '../assets/images/arrow_right.png';
// import MyMapComponent from '../components/MapView'; // Import the modified map component


// const BookingPage = () => {
//   const [pickupAddress, setPickupAddress] = useState('');
//   const [pickupCoordinates, setPickupCoordinates] = useState(null);
//   const [dropoffAddress, setDropoffAddress] = useState('');
//   const [dropoffCoordinates, setDropoffCoordinates] = useState(null);

//   useEffect(() => {
//     if (pickupAddress) {
//       Geocode.fromAddress(pickupAddress).then(
//         (response) => {
//           const { lat, lng } = response.results[0].geometry.location;
//           setPickupCoordinates({ lat, lng });
//         },
//         (error) => {
//           console.error('Error fetching pickup coordinates:', error);
//         }
//       );
//     }
//   }, [pickupAddress]);

//   useEffect(() => {
//     if (dropoffAddress) {
//       Geocode.fromAddress(dropoffAddress).then(
//         (response) => {
//           const { lat, lng } = response.results[0].geometry.location;
//           setDropoffCoordinates({ lat, lng });
//         },
//         (error) => {
//           console.error('Error fetching dropoff coordinates:', error);
//         }
//       );
//     }
//   }, [dropoffAddress]);

//   const handlePickupChange = (e) => {
//     setPickupAddress(e.target.value);
//   };

//   const handleDropoffChange = (e) => {
//     setDropoffAddress(e.target.value);
//   };

//   const handleConfirm = () => {
//     console.log('Pickup Address:', pickupAddress);
//     console.log('Pickup Coordinates:', pickupCoordinates);
//     console.log('Dropoff Address:', dropoffAddress);
//     console.log('Dropoff Coordinates:', dropoffCoordinates);
//   };
//   const userLocation = { lat: 31.2357, lng: 30.0444 };
//   return (
//     <>
//       <div>
//         <h1 className='text-[36px] font-bold flex items-center justify-center h-auto sm:text-[48px] mt-[30px] text-primary'>BOOK A TRIP</h1>
//         <div className='absolute left-[280px] top-[250px] w-[350px] h-[450px] bg-whitish rounded-[20px] inline-block drop-shadow-lg'>
//           <h2 className='text-[28px] font-bold flex items-center justify-center h-auto sm:text-[36px] mt-[30px] text-primary'>Find a trip</h2>
//           <input type="text" className='border-[2px] border-accent rounded-[5px] w-[240px] h-[40px] m-[10px] relative left-[50px] top-[30px] text-[14px] pl-[14px]' placeholder='Pickup Location' onChange={handlePickupChange} />
//           <input type="text" className='border-[2px] border-accent rounded-[5px] w-[240px] h-[40px] m-[10px] relative left-[50px] top-[30px] text-[14px] pl-[14px]' placeholder='Dropoff Location' onChange={handleDropoffChange} />
//           <button className='inline-block w-[130px] h-[50px] bg-accent rounded-[5px] drop-shadow-lg relative top-[75px] left-[110px] font-bold text-[20px] text-primary hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 hover:text-whitish' onClick={handleConfirm}>CONFIRM</button>
//         </div>

//         <div className='h-[600px] w-[500px] bg-whitish drop-shadow-lg rounded-[20px] absolute top-[250px] left-[700px] inline-block '>
//      <h3 className='text-[36px] font-bold flex items-center justify-center h-auto sm:text-[36px] mt-[30px] text-primary ' >Choose a Ride</h3>

//      <div className='relative w-[400px] h-[100px] bg-secondary rounded-[5px] top-[40px] left-[50px] drop-shadow-md'>
//      <h4 className='font-bold text-[24px] relative left-[150px] top-[10px] inline-block text-primary'>Basic Ride</h4>
//      <img src={basicRide} className='h-[40px] relative right-[110px] top-[30px] inline-block' />
//      <p className='text-[14px] relative left-[150px] inline-block text-primary'>Basic car with a special-needs <br></br>trained driver</p>
//      <a href=""><img src={arrowRight} className='h-[30px] relative left-[170px] bottom-[20px] inline-block' /></a>
//     </div>

//      <div className='relative w-[400px] h-[100px] bg-secondary rounded-[5px] top-[40px] left-[50px] drop-shadow-md mt-[25px]'>
//      <h4 className='font-bold text-[24px] relative left-[150px] inline-block text-primary'>Van Ride</h4>
//      <img src={vanRide} className='h-[40px] relative right-[75px] top-[30px] inline-block' />
//      <p className='text-[14px] relative top-[45px] right-[45px] inline-block text-primary'>Van car with a special-needs<br></br>trained driver</p>
//      <a href=""><img src={arrowRight} className='h-[30px] relative left-[355px] bottom-[15px] inline-block' /></a>
//      </div>

//      <div className='relative w-[400px] h-[100px] bg-secondary rounded-[5px] top-[40px] left-[50px] drop-shadow-md mt-[25px]'>
//      <h4 className='font-bold text-[24px] relative left-[150px] top-[10px] inline-block text-primary'>VIP Van Ride</h4>
//      <img src={vipRide} className='h-[40px] relative right-[120px] top-[30px] inline-block' />
//      <p className='text-[14px] relative left-[150px] inline-block text-primary'>Van car with a special-needs<br></br>trained driver and a care-giver</p>
//      <a href=""><img src={arrowRight} className='h-[30px] relative left-[170px] bottom-[20px] inline-block' /></a>
//      </div>
//      </div>
//      <div className='h-[600px] w-[500px] drop-shadow-lg  absolute top-[250px] right-[150px] inline-block rounded-[20px] bg-accent'>
//      <MyMapComponent userLocation={userLocation} /></div>
//       </div>
//     </>
//   );
// }

// export default BookingPage;


import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';
import { GooglePlacesAutocomplete } from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';
import basicRide from '../assets/images/basicRide_icon.png';
import vanRide from '../assets/images/vanRide_icon.png';
import vipRide from '../assets/images/vipRide_icon.png';
import arrowRight from '../assets/images/arrow_right.png';
import MyMapComponent from '../components/MapView'; // Import the modified map component

const BookingPage = () => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupCoordinates, setPickupCoordinates] = useState(null);
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [dropoffCoordinates, setDropoffCoordinates] = useState(null);

  useEffect(() => {
    if (pickupAddress) {
      Geocode.fromAddress(pickupAddress).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setPickupCoordinates({ lat, lng });
        },
        (error) => {
          console.error('Error fetching pickup coordinates:', error);
        }
      );
    }
  }, [pickupAddress]);

  useEffect(() => {
    if (dropoffAddress) {
      Geocode.fromAddress(dropoffAddress).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setDropoffCoordinates({ lat, lng });
        },
        (error) => {
          console.error('Error fetching dropoff coordinates:', error);
        }
      );
    }
  }, [dropoffAddress]);

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
          <GooglePlacesAutocomplete
            apiKey="AIzaSyCvOjfMLwSmSFmcOMAc6TRMeeLIg6-Q2WI"
            selectProps={{
              value: pickupAddress,
              onChange: setPickupAddress,
              placeholder: 'Pickup Location',
            }}
          />
          <GooglePlacesAutocomplete
            apiKey="AIzaSyCvOjfMLwSmSFmcOMAc6TRMeeLIg6-Q2WI"
            selectProps={{
              value: dropoffAddress,
              onChange: setDropoffAddress,
              placeholder: 'Dropoff Location',
            }}
          />
          <button className='inline-block w-[130px] h-[50px] bg-accent rounded-[5px] drop-shadow-lg relative top-[75px] left-[110px] font-bold text-[20px] text-primary hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 hover:text-whitish' onClick={handleConfirm}>CONFIRM</button>
        </div>

        <div className='h-[600px] w-[500px] bg-whitish drop-shadow-lg rounded-[20px] absolute top-[250px] left-[700px] inline-block '>
        <h3 className='text-[36px] font-bold flex items-center justify-center h-auto sm:text-[36px] mt-[30px] text-primary ' >Choose a Ride</h3>

//      <div className='relative w-[400px] h-[100px] bg-secondary rounded-[5px] top-[40px] left-[50px] drop-shadow-md'>
//      <h4 className='font-bold text-[24px] relative left-[150px] top-[10px] inline-block text-primary'>Basic Ride</h4>
//      <img src={basicRide} className='h-[40px] relative right-[110px] top-[30px] inline-block' />
//      <p className='text-[14px] relative left-[150px] inline-block text-primary'>Basic car with a special-needs <br></br>trained driver</p>
//      <a href=""><img src={arrowRight} className='h-[30px] relative left-[170px] bottom-[20px] inline-block' /></a>
//     </div>

//      <div className='relative w-[400px] h-[100px] bg-secondary rounded-[5px] top-[40px] left-[50px] drop-shadow-md mt-[25px]'>
//      <h4 className='font-bold text-[24px] relative left-[150px] inline-block text-primary'>Van Ride</h4>
//      <img src={vanRide} className='h-[40px] relative right-[75px] top-[30px] inline-block' />
//      <p className='text-[14px] relative top-[45px] right-[45px] inline-block text-primary'>Van car with a special-needs<br></br>trained driver</p>
//      <a href=""><img src={arrowRight} className='h-[30px] relative left-[355px] bottom-[15px] inline-block' /></a>
//      </div>

//      <div className='relative w-[400px] h-[100px] bg-secondary rounded-[5px] top-[40px] left-[50px] drop-shadow-md mt-[25px]'>
//      <h4 className='font-bold text-[24px] relative left-[150px] top-[10px] inline-block text-primary'>VIP Van Ride</h4>
//      <img src={vipRide} className='h-[40px] relative right-[120px] top-[30px] inline-block' />
//      <p className='text-[14px] relative left-[150px] inline-block text-primary'>Van car with a special-needs<br></br>trained driver and a care-giver</p>
//      <a href=""><img src={arrowRight} className='h-[30px] relative left-[170px] bottom-[20px] inline-block' /></a>
//      </div>
        </div>

        <div className='h-[600px] w-[500px] drop-shadow-lg  absolute top-[250px] right-[150px] inline-block rounded-[20px] bg-accent'>
          <MyMapComponent userLocation={userLocation} />
        </div>
      </div>
    </>
  );
}

export default BookingPage;
