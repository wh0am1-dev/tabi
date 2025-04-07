import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import fonts from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'tabi',
  description: 'self-hosted guitar tab collection manager'
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={fonts}>{children}</body>
    </html>
  )
}
