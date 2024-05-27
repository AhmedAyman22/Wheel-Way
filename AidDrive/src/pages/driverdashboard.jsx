// components/DriverDashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './userinfo';

const DriverDashboard = () => {
  const { userId } = useContext(UserContext);
  const [pendingTrips, setPendingTrips] = useState([]);

  useEffect(() => {
    const fetchPendingTrips = async () => {
      try {
        const response = await axios.get('http://localhost:3001/pending-trips');
        setPendingTrips(response.data);
      } catch (error) {
        console.error('Error fetching pending trips:', error);
      }
    };

    fetchPendingTrips();
  }, []);

  const acceptTrip = async (tripId) => {
    try {
      await axios.post('http://localhost:3001/accept-trip', { tripId, driverId: userId });
      // Remove the accepted trip from the pending trips list
      setPendingTrips(pendingTrips.filter(trip => trip.id !== tripId));
    } catch (error) {
      console.error('Error accepting trip:', error);
    }
  };

  return (
    <div>
      <h1>Pending Trips</h1>
      <ul>
        {pendingTrips.map((trip) => (
          <li key={trip.id}>
            <p>Pickup: {trip.Pickup}</p>
            <p>Dropoff: {trip.Dropoff}</p>
            <p>Ride Class: {trip.Class}</p>
            <p>Duration: {trip.Duration}</p>
            <p>Distance: {trip.Distance} KM</p>
            <p>Price: {trip.Price} EGP</p>
            <button onClick={() => acceptTrip(trip.id)}>Accept Trip</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DriverDashboard;
