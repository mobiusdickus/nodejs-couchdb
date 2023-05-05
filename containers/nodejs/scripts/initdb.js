const DB_USER = process.env.COUCHDB_USER;
const DB_PASSWORD = process.env.COUCHDB_PASSWORD;
const nano = require('nano')(`http://${DB_USER}:${DB_PASSWORD}@couchdb:5984`);

const DB_NAME = 'testdb';
let db;

async function createDB() {
  try {
    await nano.db.create(DB_NAME);
    db = nano.use(DB_NAME);
    console.log(`Database '${DB_NAME}' created successfully.`);
  } catch (error) {
    if (error.statusCode === 412) {
      db = nano.use(DB_NAME);
      console.log(`Database '${DB_NAME}' already exists.`);
    } else {
      console.error(`Error creating database '${DB_NAME}':`, error.message);
    }
  }
};

async function initDB() {
  try {
    await createDB();
    const response = await db.insert({
         _id: 'some_uuid',
         username: 'admin',
         password: 'password',
         email: 'admin@foobar.com'
    });
    console.log(`Document insert response: ${response}`);
  } catch (error) {
    console.error(`Error inserting document`, error.message);
  }
};

initDB();
