# Use Ubuntu as the base image
FROM ubuntu:22.04

# Set the working directory inside the container
WORKDIR /app

# Install Python and required system dependencies
RUN apt-get update && apt-get install -y python3 python3-pip && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt /app/

# Install Python dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the rest of the project files
COPY . /app

# Change to the correct working directory where manage.py is located
WORKDIR /app/devops

# Expose Django's default port
EXPOSE 8000

# Set the entrypoint to always run Python
ENTRYPOINT ["python3", "manage.py"]

# Default command to run the Django development server
CMD ["runserver", "0.0.0.0:8000"]

