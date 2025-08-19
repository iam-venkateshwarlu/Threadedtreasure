FROM node:18-alpine

WORKDIR /src

COPY package.json package-lock.json ./
RUN npm install 

COPY . .

FROM node:18-alpine

RUN addgroup -S app && adduser -S app -G app

WORKDIR /src

# Copy only the necessary files from the builder stage
COPY --from=builder /app /app/

# Add meaningful label
LABEL maintainer="tvenkateshwarlu39@gmail.com" \
      version="1.0" \
      environment="development" 

# 10. Health check for container
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1


# Expose the application port
EXPOSE 3000

# set entrypoint to run the application and default command
ENTRYPOINT [ "node", "app.js" ]