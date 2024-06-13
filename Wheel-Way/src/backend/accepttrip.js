import express from 'express';
const router = express.Router();

router.get('/pending-trips', async (req, res) => {
  const pool = req.app.get('pool');
  try {
    const [rows] = await pool.query('SELECT * FROM rides_table WHERE status = "pending"');
    res.json(rows);
  } catch (error) {
    console.error('Database query error:', error);  // Log the specific error
    res.status(500).json({ error: 'Database query error', details: error.message });
  }
});

router.post('/accept-trip', async (req, res) => {
  const { ride_id, driver_id } = req.body;
  const pool = req.app.get('pool');
  try {
    const [result] = await pool.query('UPDATE rides_table SET status = ?, driver_id = ? WHERE ride_id = ?', ['accepted', driver_id, ride_id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Trip not found' });
    } else {
      // Fetch the updated trip details from the database
      const [acceptedTrip] = await pool.query('SELECT * FROM rides_table WHERE ride_id = ?', [ride_id]);
      res.json({ message: 'Trip accepted successfully', trip: acceptedTrip });
    }
  } catch (error) {
    console.error('Database query error:', error);  // Log the specific error
    res.status(500).json({ error: 'Database query error', details: error.message });
  }
});

// New endpoint to check the status of a specific trip
router.get('/trip-status', async (req, res) => {
  const { tripId } = req.query;
  const pool = req.app.get('pool');
  try {
    const [rows] = await pool.query('SELECT status FROM rides_table WHERE ride_id = ?', [tripId]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Trip not found' });
    } else {
      res.json({ status: rows[0].status });
    }
  } catch (error) {
    console.error('Database query error:', error);  // Log the specific error
    res.status(500).json({ error: 'Database query error', details: error.message });
  }
});

export default router;
