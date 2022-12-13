/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV == "production";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    URL: isProd ? "https://sbybus.vercel.app" : "http://localhost:3000",
  },
};

module.exports = nextConfig;
