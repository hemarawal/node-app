#pull Base-image
FROM node:16-buster

# Set environment variables for MongoDB
ENV MONGODB_USER=myuser
ENV MONGODB_PASS=mypassword
ENV MONGODB_HOST=mongodb
ENV MONGODB_PORT=27017
ENV MONGODB_DATABASE=mydb

# Create a directory for the application code
WORKDIR /app

# Install MongoDB client and any other dependencies
RUN apt-get update && apt-get install -y \
    mongodb-clients \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port on which the application will run
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
