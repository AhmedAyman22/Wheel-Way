import { Router } from 'express';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/booking', async (req, res) => {
  try {
    const {pickupLat, pickupLng,
        dropoffLat, dropoffLng, 
        Pickup,Dropoff,
        Class,Duration,
        Distance,Price,
        Date,Status} = req.body;
    const pool = req.app.get('pool');

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const sql = 'INSERT INTO rides_Table ( pickupLat, pickupLng,dropoffLat, dropoffLng, Pickup,Dropoff,Class,Duration,Distance,Price,Date,Status) VALUES (?, ?, ?, ?,?,?, ?, ?, ?)';
    const values = [ pickupLat, pickupLng,
        dropoffLat, dropoffLng, 
        Pickup,Dropoff,
        Class,Duration,
        Distance,Price,
        Date,Status];

    const [result] = await pool.query(sql, values);

    res.json({ message: 'Captain registration successful!', userId: result.insertId });
  } catch (err) {
    console.error('Error registering captain:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

export default router;
