# Use official Node.js runtime
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install -g live-server

# Copy source code
COPY . .

# Expose live-server port
EXPOSE 8080

# Run live-server to serve src folder
CMD ["live-server", "src", "--port=8080", "--host=0.0.0.0"]
