# Use a Node.js base image for building the frontend
FROM node:20.9.0 as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install frontend dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

# Build the frontend application
RUN npm run build

# Use an Nginx base image to serve the frontend
FROM nginx:alpine as prod-stage

# Copy the build output to the Nginx html directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the Nginx port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
