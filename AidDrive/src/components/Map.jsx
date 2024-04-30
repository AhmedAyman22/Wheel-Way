
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const libraries = [];

const MyMapComponent = ({ userLocation }) => {
  const mapStyles = {
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCvOjfMLwSmSFmcOMAc6TRMeeLIg6-Q2WI" libraries={libraries}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={userLocation}
        zoom={16}
      >
        <Marker position={userLocation} title="My location" />
      </GoogleMap>
    </LoadScript>
  );
};

export default MyMapComponent;
