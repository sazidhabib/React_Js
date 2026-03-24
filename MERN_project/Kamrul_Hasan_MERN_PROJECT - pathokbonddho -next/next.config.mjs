/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kamrulhasan.info',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  serverExternalPackages: ['mysql2', 'sequelize', 'bcryptjs'],
};

export default nextConfig;
