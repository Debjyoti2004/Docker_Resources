FROM ubuntu:latest

# Make the working Directory
WORKDIR /app

# Copy everything in app
COPY . /app

# Install All the Package
RUN apt-get update && apt-get install -y python3 python3-pip


# Run a command to start the application
CMD ["python3", "calculato.py"]
