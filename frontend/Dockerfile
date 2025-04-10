# =========== BUILD ==============
FROM node:18 as build-stage

WORKDIR /react-front-end
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# =========== CREATE A SERVER =============
FROM nginx:1.27.2 as server-stage

# copy server configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copy built files to server files
COPY --from=build-stage /react-front-end/build/ /usr/share/nginx/html

# Change ownership of relevant directories to nginx user
RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

USER nginx

EXPOSE 80

# Command to start NGINX when the container is run
CMD ["nginx", "-g", "daemon off;"]
