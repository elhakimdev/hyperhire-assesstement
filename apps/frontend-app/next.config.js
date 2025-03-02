//@ts-check
const { composePlugins, withNx } = require('@nx/next');


/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  output: 'standalone',
  outputFileTracingRoot: __dirname, // Ensures correct file paths
  nx: {
    svgr: false,
  },
  rewrites: async () => {

  const isDev = process.env.APP_ENV !== 'production';
  const apiHost = isDev
    ? `http://localhost:${process.env.NEST_JS_PORT}`
    : `http://backend:${process.env.NEST_JS_PORT}`; // Ensure `PROD_API_HOST` is set in your production environment


    return [{
      source: '/api/:path*',
      destination: `${apiHost}/api/:path*`,
    }]
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
