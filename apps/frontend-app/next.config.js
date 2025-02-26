//@ts-check
const { composePlugins, withNx } = require('@nx/next');


/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  rewrites: async () => {
    return [{
      source: '/api/:path*',
      destination: `http://localhost:${process.env.NEST_JS_PORT}/api/:path*`,
    }]
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
