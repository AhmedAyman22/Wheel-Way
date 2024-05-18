import express from 'express';

const router = express.Router();

// Route to handle booking creation
router.post('/booking', async (req, res) => {
  const pool = req.app.get('pool');
  const { pickupLat, pickupLng, dropoffLat, dropoffLng, Pickup, Dropoff, Class, Duration, Distance, Price, Date, Status } = req.body;

  try {
    const [rows] = await pool.query(
      'INSERT INTO rides_Table (pickupLat, pickupLng, dropoffLat, dropoffLng, Pickup, Dropoff, Class, Duration, Distance, Price, Date, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [pickupLat, pickupLng, dropoffLat, dropoffLng, Pickup, Dropoff, Class, Duration, Distance, Price, Date, Status]
    );
    res.status(201).json({ id: rows.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add more routes as needed

export default router;
