# Docker Commands


## View Containers & Images
```sh
docker ps                    # List running containers
docker ps -a                 # List all containers (running + stopped)
docker images                # List all Docker images
docker image ls              # Same as docker images
docker container ls -a       # List all containers
```

​
## Stop & Remove Containers
```sh
docker stop <container_id>   # Stop a running container
docker rm <container_id>     # Remove a stopped container
docker stop $(docker ps -q)  # Stop all running containers
docker rm $(docker ps -aq)   # Remove all stopped containers
docker container prune       # Remove all stopped containers
```

​
## Remove Images
```sh
docker rmi <image_id>        # Remove a specific image
docker rmi $(docker images -q)  # Remove all images
docker image prune           # Remove unused images
docker system prune -a       # Remove all unused data (containers, images, networks, cache)
```

​
## Build & Run Containers
```sh
docker build -t my_image .   # Build an image from a Dockerfile
docker run my_image          # Run a container from an image
docker run -d my_image       # Run container in detached mode (background)
docker run --rm my_image     # Run and remove container after exit
docker run -it my_image bash # Run container in interactive mode with a shell
```

​
## Manage Running Containers
```sh
docker restart <container_id>   # Restart a container
docker logs <container_id>      # View logs of a container
docker exec -it <container_id> bash  # Open a shell inside a running container
docker inspect <container_id>   # Get detailed information about a container
```

​
## Manage Volumes & Networks
```sh
docker volume ls              # List all volumes
docker volume prune           # Remove unused volumes
docker network ls             # List all networks
docker network prune          # Remove unused networks
```

​
## Clean Up Everything (⚠️ Be Careful!)
```sh
docker system prune -a --volumes   # Remove all unused containers, images, networks, and volumes

```
​
## Networking commands

### List all available networks
```sh
docker network ls
```
### Create a custom network
```sh
docker network create --driver bridge <NETWORK_NAME>
```
### Inspect network details
```sh
docker network inspect $NETWORK_NAME
```
### Run two containers and connect them to the network
```sh
docker run -dit --network $NETWORK_NAME --name <CONTAINER1> ubuntu
docker run -dit --network $NETWORK_NAME --name <CONTAINER2> ubuntu
```
### Show network connections
```sh
docker network inspect <NETWORK_NAME> | grep "Containers"
```
### List all running containers
```sh
docker ps
```

### Check if $CONTAINER1 can ping $CONTAINER2
```sh
docker exec -it <CONTAINER1> ping -c 3 <CONTAINER2>
```

### Connect an existing container to the network
```sh
docker network connect <NETWORK_NAME> <CONTAINER1>
```

### Disconnect a container from the network"
```sh
docker network disconnect <NETWORK_NAME> <CONTAINER1>
```

### Remove a network (must stop containers first)"
```sh
docker stop <CONTAINER1> <CONTAINER2>
docker rm <CONTAINER1> <CONTAINER2>
docker network rm <NETWORK_NAME>
```


### Docker Registry command
```sh
docker login  # Login with your docker hub
docker pull   # Downloads an image from the configured registry.
docker push   # Uploads an image to the configured registry.

```
