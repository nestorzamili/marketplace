# Multi-stage Dockerfile untuk Next.js Application
# Stage 1: Dependencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install pnpm dan dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies dan source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install pnpm dan build aplikasi
RUN npm install -g pnpm
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
RUN pnpm build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user untuk security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Set correct permissions untuk .next directory
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy built application dengan correct ownership
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch ke non-root user
USER nextjs

# Expose port
EXPOSE 3123

# Set environment variables untuk runtime
ENV PORT 3123
ENV HOSTNAME "0.0.0.0"

# Start aplikasi
CMD ["node", "server.js"]
