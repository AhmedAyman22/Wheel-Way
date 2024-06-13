import express from 'express';
const router = express.Router();

router.post('/completed-trip', async (req, res) => {
  const { ride_id, driver_id, rating } = req.body;
  const pool = req.app.get('pool');
  
  try {
    // Execute the first query
    const [result] = await pool.query('UPDATE rides_table SET status = ? WHERE ride_id = ?', ['completed', ride_id]);

    // Execute the second query
    const [secondResult] = await pool.query('UPDATE driver_table SET average_rating = ? WHERE driver_id = ?', [rating, driver_id]);

    // Send both results in the response
    res.json({ message: 'Trip completed successfully', result, secondResult });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database query error', details: error.message });
  }
});

export default router;
