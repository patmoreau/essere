# Stage 1: Build the application
FROM node:24-alpine AS builder

WORKDIR /app

# Install pnpm and copy package manager files
RUN npm install -g pnpm
ENV PNPM_ALLOW_UNTRUSTED_SCRIPTS=true
ENV CI=true
RUN pnpm config set ignore-scripts false
RUN pnpm config set dangerouslyAllowAllBuilds true

COPY package.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Build the application
RUN pnpm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine


# Copy the built assets from the builder stage to the Nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy env config and entrypoint script
COPY env/prod/config.json /usr/share/nginx/html/config.json
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Remove old env script if not needed
# COPY 40-generate-env.sh /docker-entrypoint.d/
# RUN chmod +x /docker-entrypoint.d/40-generate-env.sh

# Expose port 80 and use custom entrypoint to inject env vars, then start Nginx
EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]