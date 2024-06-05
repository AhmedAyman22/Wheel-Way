import { Router } from 'express';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { email, password, accountType } = req.body;
    const pool = req.app.get('pool');

    if (email && password && accountType) {
      let table;
      let idField;
      if (accountType === 'rider') {
        table = 'user_table'; // Adjust this to the actual rider table name
        idField = 'user_id'; // Adjust this to the actual field name for the rider ID
      } else if (accountType === 'captain') {
        table = 'driver_Table'; // Adjust this to the actual captain table name
        idField = 'driver_id'; // Adjust this to the actual field name for the captain ID
      } else {
        return res.status(400).json({ message: 'Invalid account type!' });
      }

      // Execute SQL query to select the account from the appropriate table
      const [results] = await pool.query(`SELECT * FROM ${table} WHERE email = ?`, [email]);

      // If the account exists
      if (results.length > 0) {
        const user = results[0];

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          // Authenticate the user and include the ID and first name in the response
          res.status(200).json({ message: 'Login successful!', id: user[idField], username: user.username });
        } else {
          res.status(401).json({ message: 'Incorrect Email and/or Password!' });
        }
      } else {
        res.status(401).json({ message: 'Incorrect Email and/or Password!' });
      }
    } else {
      res.status(400).json({ message: 'Please enter Email, Password, and Account Type!' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

export default router;
