# Base Stage: Common Setup for All Stages
FROM ubuntu:22.04 AS base
WORKDIR /app

# Install curl and required dependencies
RUN apt update && apt install -y curl git ca-certificates

# Install latest Node.js and PNPM
RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash - && \
    apt install -y nodejs && \
    corepack enable && corepack prepare pnpm@latest --activate

# Stage 1: Install dependencies (Shared for all apps)
FROM base AS deps
WORKDIR /app

# Copy package files first (for better caching)
COPY pnpm-lock.yaml package.json nx.json .npmrc ./

# Install dependencies only once
RUN pnpm install --no-frozen-lockfile

# Copy the entire monorepo (without reinstalling)
COPY . .

# Stage 2: Build Backend (NestJS)
FROM base AS backend_builder
WORKDIR /app

# Copy dependencies from deps stage
# COPY --from=deps /app/node_modules ./node_modules

# Use volumes instead of copying node_modules
# VOLUME ["/app/node_modules"]
COPY --from=deps /app/apps/backend-app ./apps/backend-app
COPY --from=deps /app/prisma ./prisma
COPY --from=deps /app/package.json ./package.json
RUN pnpm nx build backend
RUN pnpm prisma generate --schema=apps/prisma/schema.prisma

# Stage 3: Build Frontend (Next.js)
FROM base AS frontend_builder
WORKDIR /app

# Copy dependencies from deps stage
# COPY --from=deps /app/node_modules ./node_modules
# VOLUME ["/app/node_modules"]
COPY --from=deps /app/apps/frontend-app ./apps/frontend-app
COPY --from=deps /app/package.json ./package.json

RUN pnpm nx build frontend

# Stage 4: Run Backend (Production)
FROM base AS backend_runner
WORKDIR /app

# Use volumes instead of copying node_modules
# VOLUME ["/app/node_modules"]

# Copy built backend files
COPY --from=backend_builder /app/dist/apps/backend-app ./dist/apps/backend-app
# COPY --from=deps /app/node_modules ./node_modules
COPY --from=backend_builder /app/prisma ./prisma

# EXPOSE 3001
# CMD ["node", "dist/apps/backend/main"]

# Stage 5: Run Frontend (Production)
FROM base AS frontend_runner
WORKDIR /app

# Use volumes instead of copying node_modules
# VOLUME ["/app/node_modules"]

# Copy built frontend files
COPY --from=frontend_builder /app/dist/apps/frontend/.next ./apps/frontend/.next
COPY --from=frontend_builder /app/apps/frontend/public ./apps/frontend/public
# COPY --from=deps /app/node_modules ./node_modules

# EXPOSE 3000
# CMD ["pnpm", "nx", "serve", "frontend"]
