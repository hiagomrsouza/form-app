# Docker Setup for Frontend Development

This document provides instructions for setting up and running the frontend application using Docker.

## Prerequisites

- Docker and Docker Compose installed on your machine
- Git repository cloned to your local machine

## Getting Started

### 1. Build and Start the Frontend Container

```bash
# Navigate to the frontend directory
cd frontend

# Build and start the container in detached mode
docker-compose up -d
```

The frontend application will be available at http://localhost:3000

### 2. View Logs

```bash
# View logs from the frontend container
docker-compose logs -f
```

### 3. Stop the Container

```bash
# Stop the container
docker-compose down
```

## Development Workflow

The Docker setup is configured for an optimal development experience:

- **Hot Reloading**: Changes to your code will automatically trigger a rebuild and refresh in the browser.
- **Volume Mounting**: The local directory is mounted into the container, so changes to files are immediately available.
- **Node Modules Caching**: Node modules are stored in a Docker volume for better performance.
- **Resource Limits**: The container is configured with resource limits to prevent excessive CPU or memory usage.

## Connecting to the Backend

The frontend is configured to connect to the backend API at http://localhost:8080. Make sure the backend is running before attempting to use API features.

To run both frontend and backend together:

```bash
# Start the backend first
cd backend
docker-compose up -d

# Then start the frontend
cd ../frontend
docker-compose up -d
```

## Troubleshooting

### Container Won't Start

Check if there are any port conflicts:

```bash
# Check if port 3000 is already in use
lsof -i :3000
```

### Hot Reloading Not Working

If hot reloading isn't working properly:

1. Make sure the WATCHPACK_POLLING environment variable is set to true in docker-compose.yml
2. Restart the container:

```bash
docker-compose down
docker-compose up -d
```

### Other Issues

For other issues, check the container logs:

```bash
docker-compose logs -f