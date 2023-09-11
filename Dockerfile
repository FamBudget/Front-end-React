# Base image
FROM node:18.16-bullseye-slim

# Set working directory
WORKDIR /app
COPY package*.json ./
# Copy app files
COPY . .

# Install dependencies
RUN npm install

# Build app
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
