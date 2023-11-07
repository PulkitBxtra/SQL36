const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

// Connect to the SQLite database
const db = new sqlite3.Database('temp.db');


// Middleware to parse JSON data
app.use(express.json());

// Define your routes and handle database operations
app.get('/users', (req, res) => {
  db.all('SELECT * FROM PlaylistTrack', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Start the Express server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
