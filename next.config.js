/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force static generation for maximum stability
  output: 'standalone',
  
  // Disable all experimental features  
  experimental: {
    workerThreads: false,
    swcTraceProfiling: false
  },
  
  // Optimize for development stability
  webpack: (config, { dev, isServer }) => {
    // Disable webpack cache in development to prevent worker issues
    if (dev) {
      config.cache = false
    }
    
    // Ensure proper fallbacks for client-side
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false
      }
    }
    
    return config
  },
  
  // Disable development indicators that can cause issues
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right'
  }
}

module.exports = nextConfig