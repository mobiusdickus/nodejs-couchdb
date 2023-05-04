# Node.js and CouchDB with Docker

Dockerized template for a Node.js API and CouchDB database, served through Node.js.

## Set up

1. Create a `.env` file at the project root dir.
2. Add the environment virables needed to run the set up.
   1. `ENVIRONMENT`
      1. Set to `dev` or `prod` for different runnings instances of the webserver.
   2. `COUCHDB_USER`
   3. `COUCHDB_PASSWORD`
3. Export variables from the `.env` to local shell with ``` export $(cat .env | xargs) ```.
   1. Alternatively, you can install `direnv` to auto load the environment variables.

## Development

## Comments
