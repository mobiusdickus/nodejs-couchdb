#!/bin/bash

# Variables
couchdb_host="couchdb"
couchdb_port="5984"
couchdb_user=$COUCHDB_USER
couchdb_password=$COUCHDB_PASSWORD
wait_time=5
max_retries=12
COUCHDB_URI="http://${couchdb_user}:${couchdb_password}@${couchdb_host}:${couchdb_port}"


# Function to check CouchDB connection
check_couchdb_connection() {
  response=$(curl -s -w "\n%{http_code}" -X GET "${COUCHDB_URI}")
  status_code=$(echo "${response}" | tail -n1)
  
  if [ "${status_code}" == "200" ]; then
    return 0
  else
    return 1
  fi
}

# Install dependencies
echo "Installing curl..."
apk add curl

# Wait for CouchDB connection
echo "Waiting for CouchDB connection..."
retries=0
while ! check_couchdb_connection; do
  retries=$((retries+1))
  if [ ${retries} -eq ${max_retries} ]; then
    echo "CouchDB connection failed after ${max_retries} attempts. Exiting."
    exit 1
  fi
  echo "CouchDB is not yet available. Retrying in ${wait_time} seconds..."
  sleep ${wait_time}
done
echo "CouchDB is now available."

# Initialize CouchDB 
echo -e "\nInitializing CouchDB for single node use.\n"

echo "Adding _users..."
curl -X PUT "${COUCHDB_URI}/_users"

echo "Adding _replicator..."
curl -X PUT "${COUCHDB_URI}/_replicator"

echo "Adding _global_changes..."
curl -X PUT "${COUCHDB_URI}/_global_changes"

echo -e "\nStarting node web server."

# Start the web server
if [ "$ENVIRONMENT" = "dev" ]; then
    echo "Starting dev server..."
    npm run dev
elif [ "$ENVIRONMENT" = "prod" ]; then
    echo "Starting prod server..."
    node app.js
else
    echo "ERROR: incorrect or missing ENVIRONMENT env variable." 
fi
