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
  const { ride_id,driver_id } = req.body;
  const pool = req.app.get('pool');
  try {
    const [result] = await pool.query('UPDATE rides_table SET  status = ?,driver_id=? WHERE ride_id = ?',  [ 'accepted', driver_id ,ride_id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Trip not found' });
    } else {
      res.json({ message: 'Trip accepted successfully' });
    }
  } catch (error) {
    console.error('Database query error:', error);  // Log the specific error
    res.status(500).json({ error: 'Database query error', details: error.message });
  }
});

export default router;
