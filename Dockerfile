# Stage 1: Build the application
FROM node:18-alpine AS builder

# Install necessary packages including OpenSSL
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine

# Install necessary packages including OpenSSL
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next/standalone ./.next/standalone
COPY --from=builder /app/.next/static ./.next/standalone/.next/static
COPY --from=builder /app/public ./.next/standalone/public

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", ".next/standalone/server.js"]