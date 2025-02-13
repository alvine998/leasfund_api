# Use official Node.js image as the base
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Copy the .env file
COPY .env .env

# Build the application
RUN npm run build

# Expose the application port (adjust if needed)
EXPOSE 4000

# Start the NestJS app
CMD ["npm", "run", "start:prod"]
