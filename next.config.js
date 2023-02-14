/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: './',
  prefetch: false,
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
