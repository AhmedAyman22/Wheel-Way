import express from 'express';
import bcrypt from 'bcrypt';
const router = express.Router();

router.post('/update', async (req, res) => {
    const pool = req.app.get('pool');
    try {
      const { first_name, last_name, email, password, accountType } = req.body;

      // Hash the password before storing - matches the approach used in
      // signup/login routes (never persist plaintext passwords)
      const hashedPassword = await bcrypt.hash(password, 10);

        if (accountType === 'rider') {
          // Update user_table
          await pool.query(`
            UPDATE user_table
            SET first_name = ?, last_name = ?, email = ?, password = ?
            WHERE email = ?
          `, [first_name, last_name, email, hashedPassword, email]
        );
        } else if (accountType === 'driver') {
          // Update driver_table
          await pool.query(`
            UPDATE driver_table
            SET first_name = ?, last_name = ?, email = ?, password = ?
            WHERE email = ?
          `, [first_name, last_name, email, hashedPassword, email]);
        }

        res.status(200).json({ message: 'User details updated successfully!' });
     
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  });
  
  export default router;
  