import express from 'express';
import bodyParser from 'body-parser';
import mysql2 from 'mysql2/promise'; 

// Replace with your actual MySQL connection details
const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Tarekahmed1',
  database: 'AIDRIVE',
});

const app = express();
app.use(bodyParser.json()); // Parse incoming JSON data

// Define the Rider object structure (matches your database table columns)

app.post('/src/join/Captain/signup', (req, res) => {
  const reqData = req.body;

  // Perform your signup logic here

  // Example of success response
  const success = true; // This should be based on your signup logic
  if (success) {
    return res.status(200).json({ message: 'Signup successful!' });
  } else {
    // Example of error response
    return res.status(400).json({ message: 'Signup failed. User already exists.' });
  }

  // In case of server error
  // return res.status(500).json({ message: 'Internal server error.' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


// Route to handle rider signup (POST request)
/*app.post('http://localhost:3000/join/Captain/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate data (you can add additional validation here)
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    } 

    // Check for existing email (optional)
    const [existingRider] = await pool.query('SELECT * FROM user_table WHERE email = ?', [email]);
    if (existingRider.length > 0) {
      return res.status(400).json({ message: 'Email address already exists' });
    }

    // Hash the password before saving (recommended for security)
    // You'll need a password hashing library like bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // Replace with your hashing logic

    // Prepare SQL query with placeholders for security
    const sql = 'INSERT INTO user_table (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
    const values = [firstName, lastName, email, hashedPassword];

    // Execute the query
    const [result] = await pool.query(sql, values);

    // Send successful response
    res.json({ message: 'Rider registration successful!', riderId: result.insertId }); // Include relevant rider data (optional)
  } catch (err) {
    console.error('Error registering rider:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});
const port = process.env.PORT || 3000; // Set port for server

app.listen(port, () => console.log(`Server listening on port ${port}`));
*/
