/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  typescript: {
    // Only ignore in development for faster builds
    // Production builds should catch all errors
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  eslint: {
    // Only ignore in development for faster builds
    // Production builds should catch all errors
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
}

export default nextConfig