const express = require('express');
const app = express();

const DB_USER = process.env.COUCHDB_USER;
const DB_PASSWORD = process.env.COUCHDB_PASSWORD;
const DB_NAME = 'testdb';

const nano = require('nano')(`http://${DB_USER}:${DB_PASSWORD}@couchdb:5984`);
const db = nano.use(DB_NAME);

app.get('/', async (req, res) => {
  try {
    const user = await db.get('some_uuid');

    res.setHeader('Content-Type', 'text/html');
    res.write("<h1>Welcome to Node.js and CouchDB with Docker!</h1>");
    res.write("<h3>Default user data pulled from the database --></h3>");
    res.write(`<h3>Username: ${user.username}<br>Email: ${user.email}</h3>`);
    return res.end();
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
