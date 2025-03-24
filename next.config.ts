import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['umbrel.local'],
  devIndicators: {
    position: 'bottom-left'
  }
}

export default nextConfig
