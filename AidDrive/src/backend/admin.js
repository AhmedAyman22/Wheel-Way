const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Query to add a new admin user
const addAdminQuery = `
  INSERT INTO user_table (username, password, email, role)
  VALUES (?, ?, ?, 'admin')
`;

// Query to update user details
const updateUserQuery = `
  UPDATE user_table
  SET username = ?, email = ?
  WHERE user_id = ?
`;

// Query to delete a user
const deleteUserQuery = `
  DELETE FROM user_table
  WHERE user_id = ?
`;

// Query to update driver details
const updateDriverQuery = `
  UPDATE driver_table
  SET driver_name = ?, driver_license = ?
  WHERE driver_id = ?
`;

// Query to delete a driver
const deleteDriverQuery = `
  DELETE FROM driver_table
  WHERE driver_id = ?
`;

// Query to update ride details
const updateRideQuery = `
  UPDATE rides_table
  SET destination = ?, fare = ?
  WHERE ride_id = ?
`;

// Query to delete a ride
const deleteRideQuery = `
  DELETE FROM rides_table
  WHERE ride_id = ?
`;


connection.query(updateUserQuery, ['new_username', 'new_email', 1], (err, results) => {
   if (err) {
    console.error('Error updating user:', err);
    return;
  }
  console.log('User updated successfully');
});

connection.query(deleteUserQuery, [1], (err, results) => {
  if (err) {
    console.error('Error deleting user:', err);
    return;
  }
  console.log('User deleted successfully');
});

connection.end();
