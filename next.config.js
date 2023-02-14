/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '/',
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
