import express from 'express';
const router = express.Router();

router.post('/completed-trip', async (req, res) => {
  const { ride_id, driver_id, rating } = req.body;
  const pool = req.app.get('pool');


  try {
    // Get a connection from the pool
    const conn = await pool.getConnection();

    try {
      // Start a transaction
      await conn.beginTransaction();

      console.log(`Updating ride status for ride_id: ${ride_id}`);
      // First query: Update the ride status
      const [rideResult] = await conn.query(
        'UPDATE rides_table SET status = ? WHERE ride_id = ?',
        ['completed', ride_id]
      );
      if (rideResult.affectedRows === 0) {
        throw new Error('Trip not found');
      }

      console.log(`Updating driver rating for driver_id: ${driver_id}`);
      // Second query: Update the driver's rating
      const [driverResult] = await conn.query(
        'UPDATE driver_table SET average_rating = ? WHERE driver_id = ?',
        [rating, driver_id]
      );
      if (driverResult.affectedRows === 0) {
        throw new Error('Driver not found');
      }

      // Commit the transaction
      await conn.commit();

      console.log('Transaction committed successfully');
      res.json({ message: 'Trip completed and driver rating updated successfully' });
    } catch (error) {
      // Rollback the transaction in case of error
      await conn.rollback();
      console.error('Transaction error:', error);
      res.status(500).json({ error: 'Database query error', details: error.message });
    } finally {
      conn.release();
      console.log('Connection released');
    }
  } catch (error) {
    console.error('Connection error:', error);
    res.status(500).json({ error: 'Database connection error', details: error.message });
  }
});

export default router;
