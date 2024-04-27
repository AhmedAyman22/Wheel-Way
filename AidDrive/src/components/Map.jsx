import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const libraries = []; // No libraries needed for basic markers

const MyMapComponent = ({ center = { lat: 37.7749, lng: -122.4194 } }) => {
  const [map, setMap] = useState(null);

  const mapContainerStyle = {
    width: '500px',
    height: '500px',
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  useEffect(() => {
    console.log('Map component mounted');
  }, []);

  return (
    <LoadScript
      googleMapsApiKey="YOUR_API_KEY" // Replace with your actual API key
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        options={options}
        zoom={8}
        center={center}
        onLoad={(map) => setMap(map)}
      >
        {map && <Marker position={center} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MyMapComponent;
