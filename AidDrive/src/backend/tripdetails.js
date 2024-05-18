import express from 'express';

const router = express.Router();

// Route to handle fetching trip details
router.get('/', async (req, res) => {
  const pool = req.app.get('pool');

  try {
    // Query the database to fetch trip details
    const [rows] = await pool.query('SELECT * FROM rides_Table');

    // If there are no trip details found
    if (!rows.length) {
      return res.status(404).json({ message: 'No trip details found' });
    }

    // Return trip details
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add more routes as needed

export default router;