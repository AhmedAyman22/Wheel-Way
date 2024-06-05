import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const pool = req.app.get('pool');

    if (email && password) {
      const table = 'admin_table'; // Adjust this to the actual admin table name
      const idField = 'admin_id'; // Adjust this to the actual field name for the admin ID

      // Execute SQL query to select the account from the admin table
      const [results] = await pool.query(`SELECT * FROM ${table} WHERE email = ? AND password = ?`, [email, password]);

      // If the account exists
      if (results.length > 0) {
        const user = results[0];

        // Authenticate the user and include the ID and first name in the response
        res.status(200).json({ message: 'Login successful!', id: user[idField], first_name: user.first_name });
      } else {
        res.status(401).json({ message: 'Incorrect Email and/or Password!' });
      }
    } else {
      res.status(400).json({ message: 'Please enter Email and Password!' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.post('/admin/update', async (req, res) => {
  try {
    const { user_id, driver_id, first_name, last_name, email, password } = req.body;
    const pool = req.app.get('pool');

    if (user_id && driver_id && first_name && last_name && email && password) {
      // Start a transaction
      await pool.beginTransaction();

      // Update user_table
      await pool.query(`
        UPDATE user_table
        SET first_name = ?, last_name = ?, email = ?, password = ?
        WHERE user_id = ?
      `, [first_name, last_name, email, password, user_id]);

      // Update driver_table
      await pool.query(`
        UPDATE driver_table
        SET first_name = ?, last_name = ?, email = ?, password = ?
        WHERE driver_id = ?
      `, [first_name, last_name, email, password, driver_id]);

      // Commit the transaction
      await pool.commit();

      res.status(200).json({ message: 'User and Driver details updated successfully!' });
    } else {
      res.status(400).json({ message: 'Please provide all required fields: user_id, driver_id, first_name, last_name, email, password' });
    }
  } catch (err) {
    // Rollback the transaction in case of an error
    console.error('Error updating user and driver:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

export default router;
