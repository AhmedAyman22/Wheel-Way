import { Router } from 'express';

const router = Router();

router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = req.app.get('pool');
    const idField = 'user_id'; // Define idField here

    // Execute SQL query to select user details
    const [results] = await pool.query(`SELECT * FROM user_table WHERE ${idField} = ?`, [id]);
    
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

export default router;
