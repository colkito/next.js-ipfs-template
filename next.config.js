/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: './',
  reactStrictMode: true,
  prefetch: false,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
