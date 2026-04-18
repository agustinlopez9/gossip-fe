# ==================================
# Stage 1: Production Dependencies
# ==================================
FROM node:20-alpine AS deps

LABEL description="my-social-app - Dependency Layer"

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm ci --omit=dev --prefer-offline --no-audit && \
    npm cache clean --force

# ==================================
# Stage 2: Builder
# ==================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

# Install ALL dependencies
RUN npm ci --prefer-offline --no-audit && \
    npm cache clean --force

COPY . .

RUN npm run build

RUN test -d dist || (echo "Build failed: dist directory not found" && exit 1)

# ==================================
# Stage 3: Nginx
# ==================================
FROM nginx:alpine AS runner

LABEL description="gossip-fe - Production Image"
LABEL version="1.0"

COPY --from=builder /app/dist /usr/share/nginx/html

# Fix permissions for all files (especially locales)
RUN chmod -R 755 /usr/share/nginx/html && \
    find /usr/share/nginx/html -type f -exec chmod 644 {} \;

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

# Health check using wget (included in nginx:alpine)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
