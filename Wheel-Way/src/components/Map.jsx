import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const apiKey = "AIzaSyCvOjfMLwSmSFmcOMAc6TRMeeLIg6-Q2WI";
const libraries = ['places'];
const styles = {
  // your styles here
};

const Map = ({ coordinates }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const onMapLoad = (map) => {
    // Load default origin and destination
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(...[window.google.maps.ControlPosition.BOTTOM_LEFT,]);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;
  
  return (
    <GoogleMap
      center={coordinates || currentLocation || { lat: 0, lng: 0 }}
      zoom={15}
      onLoad={(map) => onMapLoad(map)}
      mapContainerStyle={{ width: '100%', height: '100%', borderRadius: '20px' }}
      options={{
        styles: styles['retro']
      }}
    >
    </GoogleMap>
  );
};

export default Map;
