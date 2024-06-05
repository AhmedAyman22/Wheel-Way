import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, accountType } = req.body;
    const pool = req.app.get('pool');

    if (email && accountType) {
      let table;
      if (accountType === 'rider') {
        table = 'user_table'; // Adjust to your rider table name
      } else if (accountType === 'driver') {
        table = 'driver_table'; // Adjust to your driver table name
      } else {
        return res.status(400).json({ message: 'Invalid account type!' });
      }

      const [results] = await pool.query(`SELECT * FROM ${table} WHERE email = ?`, [email]);

      if (results.length > 0) {
        res.status(200).json({ message: 'User found', userData: results[0] });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } else {
      res.status(400).json({ message: 'Please provide both email and account type' });
    }
  } catch (err) {
    console.error('Error searching user:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});
export default router;
