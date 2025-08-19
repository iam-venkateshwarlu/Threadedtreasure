# Use official Node.js runtime
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Expose live-server port
EXPOSE 3000

# Run live-server to serve src folder
CMD ["npx", "live-server", "src", "--host=0.0.0.0", "--port=3000"]