/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: './',
  prefetch: false,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
