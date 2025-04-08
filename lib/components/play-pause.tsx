import type { FC } from 'react'
import type { AlphaTabApi } from '@coderline/alphatab'
import { useEffect } from 'react'
import { twMerge as tw } from 'tailwind-merge'

import useRender from '@/lib/hooks/useRender'
import Button from '@/lib/ui/button'
import Icon from '@/lib/ui/icon'

type PlayPauseProps = {
  tab: AlphaTabApi
  className?: string
}

export const PlayPause: FC<PlayPauseProps> = ({ tab, className }) => {
  const render = useRender()

  useEffect(() => {
    if (!tab) return

    tab.playerStateChanged.on(render)
    return () => {
      tab.playerStateChanged.off(render)
    }
  }, [tab])

  return (
    <Button
      onClick={() => tab.playPause()}
      className={tw(
        'flex items-center justify-center',
        'aspect-square w-16 rounded-full',
        className
      )}
    >
      <span
        className={tw(
          '-translate-y-0.5',
          tab.playerState === 0 && 'translate-x-0.5'
        )}
      >
        {tab.playerState === 0 ? (
          <Icon.Play className='w-10' />
        ) : (
          <Icon.Pause className='w-10' />
        )}
      </span>
    </Button>
  )
}

export default PlayPause
