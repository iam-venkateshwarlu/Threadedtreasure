FROM nginx:stable-alpine

# Remove default site config (optional) and add our nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy static site into nginx html directory
COPY src/ /usr/share/nginx/html/

# Ensure permissions (alpine nginx runs as nginx user)
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]