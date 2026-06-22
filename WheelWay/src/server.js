import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import captainRoutes from './backend/captiansignup.js';
import riderRoutes from './backend/ridersignup.js';
import bookingRoutes from './backend/bookingdata.js';
import loginRoutes from './backend/rider_Login.js'; 
import tripRoutes from './backend/Tripdetails.js';
import adminRoutes from './backend/admin.js';
import searchRoutes from './backend/edit.js';
import updateRoutes from './backend/update.js';
import acceptRoutes from './backend/accepttrip.js';

dotenv.config();

const app = express();

app.use(bodyParser.json()); 
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173' }));

// Database credentials are read from environment variables - never commit
// real credentials to source control. See .env.example for required keys.
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'wheelway',
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
