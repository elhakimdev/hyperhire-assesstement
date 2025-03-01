# Use a lightweight Node.js runtime for production
FROM node:18 AS nest_backend_runner

WORKDIR /app

# Expose the port used by NestJS
EXPOSE 8081

# Run the application
CMD ["node", "backend-app/dist/main.js"]

FROM node:18 AS next_frontend_runner

WORKDIR /app

# Expose Next.js port
EXPOSE 3000

# Run Next.js
CMD ["node", "frontend-app/server.js"]