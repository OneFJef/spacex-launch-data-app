/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["imgur.com","i.imgur.com","images2.imgbox.com"],
  },
};

module.exports = nextConfig;
