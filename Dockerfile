# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy app files
COPY . .

# Install dependencies
RUN npm install

# Build app
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
