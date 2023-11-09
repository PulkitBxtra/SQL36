const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const formdata = require('form-data');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('temp2.db');

app.use(cors()); 
app.use(bodyParser.json());

app.post('/execute-sql', (req, res) => {
  console.log(req.body.data);
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'SQL query is required.' });
  }

  db.all(query, (err, rows) => {
    if (err) {
        console.log(err);
      return res.status(500).json({ error: 'Database error' });
    }
    console.log(rows);
    res.json({ result: rows });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
