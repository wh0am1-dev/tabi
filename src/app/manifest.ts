import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'tabi',
    short_name: 'tabi',
    description: 'self-hosted guitar tab collection manager',
    start_url: '.',
    display: 'standalone',
    background_color: '#1c1917',
    theme_color: '#f5f5f4',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon'
      }
    ]
  }
}
