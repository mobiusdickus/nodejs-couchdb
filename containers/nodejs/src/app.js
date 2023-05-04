const express = require('express');
const app = express();

const nano = require('nano')('http://admin:password@couchdb:5984');

const createDatabase = async (dbName) => {
  try {
    const response = await nano.db.create(dbName);
    console.log(`Database '${dbName}' created successfully.`);
    console.log(response);
  } catch (error) {
    if (error.statusCode === 412) {
      console.log(`Database '${dbName}' already exists.`);
    } else {
      console.error(`Error creating database '${dbName}':`, error.message);
    }
  }
};
createDatabase('testdb');
const db = nano.use('testdb');

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/testdb', async (req, res) => {
    try {
        const response = await nano.db.get('testdb');
        res.json(response);
      } catch (error) {
        if (error.statusCode === 404) {
          res.status(404).json({ message: `Database 'testdb' not found.` });
        } else {
          console.error(`Error fetching information for database 'testdb':`, error.message);
          res.status(500).json({ message: 'Internal server error.' });
        }
      }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
