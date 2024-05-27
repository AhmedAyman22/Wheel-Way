import express from 'express';
const router = express.Router();

router.post('/update', async (req, res) => {
    try {
      const pool = req.app.get('pool');
      const { first_name, last_name, email, password,accountType } = req.body;
  
        if (accountType === 'rider') {
          // Update user_table
          await pool.query(`
            UPDATE user_table
            SET first_name = ?, last_name = ?, email = ?, password = ?
            WHERE email = ?
          `, [first_name, last_name, email, password]
        );
        } else if (accountType === 'driver') {
          // Update driver_table
          await pool.query(`
            UPDATE driver_table
            SET first_name = ?, last_name = ?, email = ?, password = ?
            WHERE email = ?
          `, [first_name, last_name, email, password]);
        }
  
        // Commit the transaction
        await pool.commit();
  
        res.status(200).json({ message: 'User details updated successfully!' });
     
    } catch (err) {
      // Rollback the transaction in case of an error
      await pool.rollback();
      console.error('Error updating user:', err);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  });
  
  export default router;
  