/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    AUTH_SECRET: process.env.AUTH_SECRET,
  }
}

module.exports = nextConfig
