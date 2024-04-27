import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWhtYXltYW4iLCJhIjoiY2x2aTR2ZHZpMWJlZDJsbzVuYnlxeHU2OSJ9.8zmyP66lBPKTv9LUkknOqQ';

const MapView = () => {
  const mapContainerRef = useRef(null);
  const [userLocation, setUserLocation] = useState([31.2357, 30.0444]); // Default coordinates
  const [locationErrorMessage, setLocationErrorMessage] = useState('');

  useEffect(() => {
    // Request the user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // On success, update the userLocation state
        setUserLocation([position.coords.longitude, position.coords.latitude]);
      },
      () => {
        // On error or if permission is denied, set an error message
        setLocationErrorMessage('Location access must be permitted for this feature to work correctly.');
      }
    );
  }, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: userLocation, // Set the center to the user's location
      zoom: 16
    });

    return () => map.remove();
  }, [userLocation]); // This effect will re-run when userLocation changes

  return (
    <div>
      {locationErrorMessage && <div className='error-message'>{locationErrorMessage}</div>}
      <div ref={mapContainerRef} className='h-[700px] w-[550px] rounded-[20px] drop-shadow-lg' />
    </div>
  );
};

export default MapView;
