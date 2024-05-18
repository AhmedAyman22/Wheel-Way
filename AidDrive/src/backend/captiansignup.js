import { Router } from 'express';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const pool = req.app.get('pool');

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const [existingUser] = await pool.query('SELECT * FROM driver_Table WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email address already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO driver_Table (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
    const values = [firstName, lastName, email, hashedPassword];

    const [result] = await pool.query(sql, values);

    res.json({ message: 'Captain registration successful!', userId: result.insertId });
  } catch (err) {
    console.error('Error registering captain:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

export default router;
