# Nodejs & CouchDB with Docker & Docker Compose

This is an example template used for testing NodeJS and CouchDB with Docker and Docker Compose.

## Set up

1. Create a `.env` file at the project root dir.
2. Add the environment virables needed to run the set up.
   1. `ENVIRONMENT`
      1. Set to `dev` or `prod` for different runnings instances of the webserver.
   2. `COUCHDB_USER`
   3. `COUCHDB_PASSWORD`
3. Export variables from the `.env` to local shell with ``` export $(cat .env | xargs) ```.
4. 
