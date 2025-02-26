# Use the official Node.js image
FROM node:latest

# Install pnpm globally
RUN npm install -g pnpm --force

# Set the PNPM global bin directory in PATH
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

# Set the working directory inside the container (monorepo root)
WORKDIR /

# Copy package.json and lock file for monorepo dependencies
COPY package.json pnpm-lock.yaml ./

# Install all dependencies in the monorepo
RUN pnpm install --force

# Install PM2 globally inside the monorepo
RUN pnpm add -g pm2

# Copy the entire monorepo (so Prisma can access the root)
COPY . .

# Run Prisma migrations
RUN pnpm exec prisma generate
RUN pnpm exec prisma migrate deploy

# Do nothing—this image is just for dependency setup
CMD ["sleep", "infinity"]
