import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingPage = () => {
  const [username, setUsername] = useState('');
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:3001/api/user');
        setUsername(userResponse.data.username);

        const tripsResponse = await axios.get('http://localhost:3001/api/trips');
        setTrips(tripsResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Welcome, {username}</h1>
      <h2>Your Trips</h2>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            {trip.Pickup} to {trip.Dropoff} on {trip.Date} - {trip.Price} EGP
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingPage;
