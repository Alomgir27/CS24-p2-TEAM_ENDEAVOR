# Use the official Node.js image as base
FROM node:20.9.0

# Set working directory
WORKDIR /app/server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# RUN bash -c 'npm run clean:database'
# RUN bash -c 'npm run seed:database'

# Copy the rest of the application code
COPY . .

# Expose port
EXPOSE 5000

# Command to run the backend server
CMD ["npm", "start"]
