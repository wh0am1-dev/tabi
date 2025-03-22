import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { MotionConfig } from 'motion/react'
import fonts from '@/ui/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'tabi',
  description: 'self-hosted guitar tab collection manager'
}

export default ({ children }: { children: ReactNode }) => (
  <html lang='en'>
    <body className={`${fonts} antialiased`}>
      <MotionConfig transition={{ duration: 0.2, ease: 'easeOut' }}>
        {children}
      </MotionConfig>
    </body>
  </html>
)
