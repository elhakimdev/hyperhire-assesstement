module.exports = {
  apps: [
    {
      name: 'backend-app',
      script: 'dist/main.js', // Run the compiled NestJS app
      exec_mode: 'cluster', // Enable clustering for better performance
      instances: 'max', // Use all available CPU cores
      env: {
        NODE_ENV: 'development',
        NEST_APP_PORT: process.env.NEST_APP_PORT || 3000,
        NEST_APP_HOST: process.env.NEST_APP_HOST || 'localhost',
        APP_ENV: process.env.APP_ENV || 'development',
        NEST_APP_DEBUG: process.env.NEST_APP_DEBUG || true,
        NEST_APP_TIMEZONE: process.env.NEST_APP_TIMEZONE || 'UTC',
        NEST_APP_LOCALE: process.env.NEST_APP_LOCALE || 'en',
        NEST_APP_LOG_LEVEL: process.env.NEST_APP_LOG_LEVEL || 'info',
        NEST_APP_GLOBAL_PREFIX: process.env.NEST_APP_GLOBAL_PREFIX || 'api',
        
        NEST_DB_HOST: process.env.NEST_DB_HOST,
        NEST_DB_PORT: process.env.NEST_DB_PORT,
        NEST_DB_DATABASE: process.env.NEST_DB_DATABASE,
        NEST_DB_USER: process.env.NEST_DB_USER,
        NEST_DB_PASSWORD: process.env.NEST_DB_PASSWORD,
        NEST_DB_PRISMA_DATABASE_URL: process.env.NEST_DB_PRISMA_DATABASE_URL,
      },
      env_production: {
        NODE_ENV: 'production',
        NEST_APP_PORT: process.env.NEST_APP_PORT || 8081,
        NEST_APP_HOST: process.env.NEST_APP_HOST || 'localhost',
        APP_ENV: process.env.APP_ENV || 'development',
        NEST_APP_DEBUG: process.env.NEST_APP_DEBUG || true,
        NEST_APP_TIMEZONE: process.env.NEST_APP_TIMEZONE || 'UTC',
        NEST_APP_LOCALE: process.env.NEST_APP_LOCALE || 'en',
        NEST_APP_LOG_LEVEL: process.env.NEST_APP_LOG_LEVEL || 'info',
        NEST_APP_GLOBAL_PREFIX: process.env.NEST_APP_GLOBAL_PREFIX || 'api',
        
        NEST_DB_HOST: process.env.NEST_DB_HOST,
        NEST_DB_PORT: process.env.NEST_DB_PORT,
        NEST_DB_DATABASE: process.env.NEST_DB_DATABASE,
        NEST_DB_USER: process.env.NEST_DB_USER,
        NEST_DB_PASSWORD: process.env.NEST_DB_PASSWORD,
        NEST_DB_PRISMA_DATABASE_URL: process.env.NEST_DB_PRISMA_DATABASE_URL,
      }
    }
  ]
};
