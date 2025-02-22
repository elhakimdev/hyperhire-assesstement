//@ts-check
const { composePlugins, withNx } = require('@nx/next');


/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  rewrites: async () => {
    return process.env.NODE_ENV === "development" ? [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8081/api/:path*',
      },
    ] : [
      {
        source: '/api/:path*',
        destination: '${}/:path*',
      },
    ];
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
