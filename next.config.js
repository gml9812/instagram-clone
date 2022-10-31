/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.ggumim.co.kr'],
  },
};

module.exports = nextConfig;
