# Use the official Node.js image as base
FROM node:18.3.0

# Set working directory
WORKDIR /app/client

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port
EXPOSE 3000

# Command to start the frontend development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
