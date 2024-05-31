import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2/promise';
import captainRoutes from './backend/captiansignup.js';
import riderRoutes from './backend/ridersignup.js';
import bookingRoutes from './backend/bookingdata.js';
import loginRoutes from './backend/rider_Login.js'; 
import tripRoutes from './backend/Tripdetails.js';
import adminRoutes from './backend/admin.js';
import searchRoutes from './backend/edit.js';
import updateRoutes from './backend/update.js';
import acceptRoutes from './backend/accepttrip.js';

const app = express();

app.use(bodyParser.json()); 
app.use(cors({ origin: '*' }));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Tarekahmed1',
  database: 'AIDRIVE',
});

// Attach the pool to the app for use in routes
app.set('pool', pool);

// Use the routes
app.use('/api/captain', captainRoutes);
app.use('/api/rider', riderRoutes);
app.use('/booking', bookingRoutes);
app.use('/api/login', loginRoutes); 
app.use('/trip-details', tripRoutes);
app.use('/api/admin/login', adminRoutes); 
app.use('/api/admin/search', searchRoutes); 
app.use('/api/admin/search', updateRoutes); 
app.use(acceptRoutes); 

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server listening on port ${port}`));
