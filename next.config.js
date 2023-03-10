/** @type {import('next').NextConfig} */

const runtimeCaching = require('next-pwa/cache');

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === 'development',
  runtimeCaching,
  buildExcludes: [
    /middleware-manifest\.json$/,
    /_middleware.js$/,
    /_middleware.js.map$/,]
});

const nextConfig = withPWA({
  experimental: {
    appDir: true,
  },
});
module.exports = nextConfig;
