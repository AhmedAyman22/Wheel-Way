import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2/promise';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import captainRoutes from './backend/captiansignup.js';
import riderRoutes from './backend/ridersignup.js';
import bookingRoutes from './backend/bookingdata.js';
import loginRoutes from './backend/rider_Login.js';
import tripRoutes from './backend/Tripdetails.js';
import adminRoutes from './backend/admin.js';
import searchRoutes from './backend/edit.js';
import updateRoutes from './backend/update.js';
import acceptRoutes from './backend/accepttrip.js';
import completedRoutes from './backend/completedtrip.js';

const app = express();

app.use(bodyParser.json());

// Allow credentials to be included in requests
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this to match your React app's URL
  credentials: true,
}));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Tarekahmed1',
  database: 'AIDRIVE',
});

// Configure MySQLStore with session

const sessionStore = new MySQLStore({}, pool);

// Configure session middleware
app.use(session({
  secret: 'your-secret-key', // Replace with your own secret key
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Attach the pool to the app for use in routes
app.set('pool', pool);

// Middleware to check for an active session
function checkSession(req, res, next) {
  if (req.session && req.session.userId ) {
    next(); // Session is active, proceed to the route
  } else {
    res.status(401).json({ message: 'Unauthorized' }); // Respond with unauthorized if session is not active
  }
}
// Endpoint to get the user ID from the session
app.get('/api/userid', (req, res) => {
  if (req.session && req.session.userId && req.session.username) {
    res.status(200).json({ userId: req.session.userId, username:req.session.username});
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});


// Use the login route without session check
app.use('/api/login', loginRoutes);

// Apply session check middleware to the routes that require it
app.use('/api/captain', checkSession, captainRoutes);
app.use('/api/rider', checkSession, riderRoutes);
app.use('/booking', checkSession, bookingRoutes);
app.use('/trip-details', checkSession, tripRoutes);
app.use('/api/admin/search', checkSession, searchRoutes);
app.use('/api/admin/search', checkSession, updateRoutes);
app.use(checkSession, acceptRoutes);
app.use(checkSession, completedRoutes);

// Routes that do not require session validation
app.use(adminRoutes); // Assuming some admin routes do not require session validation

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server listening on port ${port}`));
