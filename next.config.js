/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove webpack configuration as it's not needed with Next.js 14
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig 