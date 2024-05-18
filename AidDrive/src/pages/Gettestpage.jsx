import React, { useState, useEffect } from 'react';
import axios from 'axios';

const info = () => {
  const [tripDetails, setTripDetails] = useState([]);

  useEffect(() => {
    // Fetch trip details from the backend API
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/trip-details');
        setTripDetails(response.data);
      } catch (error) {
        console.error('Error fetching trip details:', error);
      }
    };

    fetchTripDetails();
  }, []);

  return (
    <div>
      <h1>Trip Details</h1>
      <ul>
        {tripDetails.map((trip) => (
          <li key={trip.ride_id}>
            <p>Pickup: {trip.Pickup}</p>
            <p>Dropoff: {trip.Dropoff}</p>
            <p>Class: {trip.Class}</p>
            <p>Duration: {trip.Duration}</p>
            <p>Distance: {trip.Distance}</p>
            <p>Price: {trip.Price}</p>
            <p>Date: {trip.Date}</p>
            <p>Status: {trip.Status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default info;
