/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.globalObject = 'self';
      
      // Exclude server-only packages from client bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "ldapts": false,
        "net": false,
        "tls": false,
        "fs": false,
      };
      
      // Add ldapts as external to prevent bundling
      config.externals = config.externals || [];
      config.externals.push('ldapts');
    }
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['ldapts'],
  },
};

export default nextConfig;
