/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Retire le header X-Powered-By
  compress: true,
};

module.exports = nextConfig;
