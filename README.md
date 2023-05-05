# Node.js and CouchDB with Docker

Dockerized template for a Node.js API and CouchDB database, served through Node.js.

## Set up

1. Install `docker` and `docker-compose`.
2. Create a `.envrc` file at the project root dir.
3. Add the environment virable exports needed to run the set up.
   - `export ENVIRONMENT`
      - Set to `dev` or `prod` for different runnings instances of the webserver.
   - `export COUCHDB_USER`
   - `export COUCHDB_PASSWORD`
4. Export variables from the `.envrc` to local shell by running:
   ```bash
   source .envrc
   ```
   - Alternatively, you can install `direnv` to auto load the environment variables.

## Development

- For detached mode, run:
  ```bash
  docker-compose up -d
  ```
- For attached mode, run:
  ```bash
  docker-compose up
  ```

## Comments

- Look at the Makefile for other useful commands.
- Should add and integrate the [nginx-proxy](https://github.com/nginx-proxy/nginx-proxy) service to the project.
