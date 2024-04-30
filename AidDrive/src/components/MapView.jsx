
import React, { useState, useEffect } from 'react';
import { useLoadScript, GoogleMap } from '@react-google-maps/api';

const libraries = ['places']; // Remove libraries for this functionality

const apiKey = "AIzaSyCvOjfMLwSmSFmcOMAc6TRMeeLIg6-Q2WI";

const MapView = () => {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // State to store user location

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
    // Hide controls after map loads
    if (mapInstance) {
      mapInstance.controls[window.google.maps.ControlPosition.TOP_LEFT].push(...[
        window.google.maps.ControlPosition.BOTTOM_LEFT,
      ]);
    }
  };

  useEffect(() => {
    const getUserLocation = async () => {
      if (navigator.geolocation) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        } catch (error) {
          console.error('Error fetching user location:', error);
          // Handle location access denied or other errors (optional)
        }
      } else {
        console.error('Geolocation is not supported by your browser');
      }
    };

    getUserLocation();
  }, []); // Empty dependency array to run only once on mount

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%', borderRadius: '20px' }} // Add border radius
      zoom={userLocation ? 16 : 10}
      center={userLocation || { lat: 0, lng: 0 }}
      onLoad={handleMapLoad}
    >
    </GoogleMap>
  );
};

export default MapView;
