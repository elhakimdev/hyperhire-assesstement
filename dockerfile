# Use a lightweight Node.js runtime for production
FROM node:18 AS nest_backend_runner

WORKDIR /app

# Expose the port used by NestJS
EXPOSE 8081

# Run the application
CMD ["node", "backend-app/dist/main.js"]
