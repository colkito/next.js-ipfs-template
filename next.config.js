/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  prefetch: false,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
