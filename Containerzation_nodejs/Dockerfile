# Use Ubuntu base image
FROM ubuntu:latest

# Set working directory
WORKDIR /app

# Install Node.js and npm (latest LTS version)
RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Copy only package.json first (for better caching)
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy all project files to the container
COPY . /app/

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]

