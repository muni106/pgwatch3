# Targets
.PHONY: help build run stop clean

help:
	@echo "Available targets:"
	@echo "  make build     : Build the Docker image"
	@echo "  make up-db		: Run the Docker container"
	@echo "  make stop      : Stop the Docker container"
	@echo "  make clean     : Remove the Docker container and image"

up:
	@echo "Compose up..."
	sudo docker compose up

up-db: up db

db:
	@echo "Adding a new test database..."
	sudo docker compose up add-test-db

down:
	@echo "Stopping Docker container..."
	sudo docker compose down

down-db:
	@echo "Stop db..."
	sudo docker compose down add-test-db

clean: stop
	@echo "Removing all..."