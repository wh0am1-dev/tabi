import type { NextConfig } from 'next'
import { AlphaTabWebPackPlugin } from '@coderline/alphatab/webpack'

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['umbrel.local'],
  devIndicators: false,
  webpack(config) {
    config.plugins.push(
      new AlphaTabWebPackPlugin({
        assetOutputDir: false // 'public/alphatab'
      })
    )
    return config
  }
}

export default nextConfig
