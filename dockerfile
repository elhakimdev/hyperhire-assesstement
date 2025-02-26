# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app/root

# Copy package.json and package-lock.json
COPY package*.json ./

# Set environment to production
ENV NODE_ENV=production

# Install PM2 globally and production dependencies
RUN npm install -g pm2 && npm install

# Copy the entire monorepo (so Prisma can access the root)
WORKDIR /usr/src/app
COPY . .

# Set Prisma path (assuming it's at the root)
WORKDIR /usr/src/app/prisma

# Generate Prisma client and run migrations
RUN npx prisma generate
RUN npx prisma migrate deploy

# Command to run the application using PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]
