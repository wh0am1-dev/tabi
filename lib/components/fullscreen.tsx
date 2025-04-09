'use client'

import type { FC } from 'react'
import { useCallback, useEffect } from 'react'
import { twMerge as tw } from 'tailwind-merge'

import useSSR from '@/lib/hooks/useSSR'
import useRender from '@/lib/hooks/useRender'
import Button from '@/lib/ui/button'
import Icon from '@/lib/ui/icon'
import { isSSR } from '@/lib/utils'
import useKeyboard from '../hooks/useKeyboard'

type FullscreenProps = {
  className?: string
}

export const Fullscreen: FC<FullscreenProps> = ({ className }) => {
  const ssr = useSSR()
  const render = useRender()

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen({ navigationUI: 'hide' })
    } else {
      document.exitFullscreen()
    }
  }, [])

  useKeyboard({ f: toggleFullscreen }, [toggleFullscreen])

  useEffect(() => {
    if (isSSR()) return

    document.addEventListener('fullscreenchange', render)
    return () => {
      document.removeEventListener('fullscreenchange', render)
    }
  }, [render])

  if (ssr || !document.fullscreenEnabled) return null

  return (
    <Button
      onClick={toggleFullscreen}
      className={tw(
        'flex items-center justify-center',
        'aspect-square rounded-full',
        className
      )}
    >
      <span className='-translate-y-0.5'>
        {!document.fullscreenElement ? (
          <Icon.FullscreenOn />
        ) : (
          <Icon.FullscreenOff />
        )}
      </span>
    </Button>
  )
}

export default Fullscreen
