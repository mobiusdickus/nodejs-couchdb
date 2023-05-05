CONTAINERS = $(shell docker ps -aq)
IMAGES = $(shell docker images -f "reference=couchdb" -f "reference=node-couchdb-webserver" -q)
VOLUMES = $(shell docker volume ls -f "name=nodejs-couchdb_couchdb_data" -q)

start:
	docker-compose up

stop:
	docker-compose stop

rm-containers:
	docker rm $(CONTAINERS)

rm-images:
	docker rmi $(IMAGES)

rm-volumes:
	docker volume rm $(VOLUMES)
	
clean: rm-containers rm-images rm-volumes

restart: stop clean start
	
list:
	@echo "CONTAINERS"
	@echo $(CONTAINERS)
	@echo
	@echo "IMAGES"
	@echo $(IMAGES)
	@echo
	@echo "VOLUMES"
	@echo $(VOLUMES)
