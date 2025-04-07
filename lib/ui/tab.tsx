'use client'

import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import { twMerge as tw } from 'tailwind-merge'
import { LayoutMode } from '@coderline/alphatab'

import useShortcuts from '@/lib/hooks/useShortcuts'
import useUpdate from '@/lib/hooks/useUpdate'
import useTab from '@/lib/hooks/useTab'
import Button from '@/lib/ui/button'
import Sidebar from '@/lib/ui/sidebar'
import Controls from '@/lib/ui/controls'
import Icon from '@/lib/ui/icon'
import { getFilename } from '@/lib/utils'

type TabProps = {
  file: string
  className?: string
}

export const Tab: FC<TabProps> = ({ file, className }) => {
  const update = useUpdate()
  const [layoutMode, setLayoutMode] = useState<LayoutMode>()
  const element = useRef<HTMLDivElement>(null)
  const tab = useTab(file, element)
  useShortcuts(tab)

  useEffect(() => {
    if (!tab) return

    tab.playerStateChanged.on(update)
    return () => {
      tab.playerStateChanged.off(update)
    }
  }, [tab])

  useEffect(() => {
    if (!tab) return

    const renderStarted = () => setLayoutMode(tab.settings.display.layoutMode)
    tab.renderStarted.on(renderStarted)
    return () => {
      tab.renderStarted.off(renderStarted)
    }
  }, [tab])

  return (
    <>
      <div
        ref={element}
        id='tab-container'
        onWheel={event => {
          if (layoutMode === LayoutMode.Horizontal) {
            event.preventDefault()
            event.currentTarget.scrollLeft += event.deltaY
          }
        }}
        className={tw(
          'w-full',
          layoutMode === LayoutMode.Page
            ? 'overflow-x-hidden overflow-y-auto'
            : 'overflow-x-auto overflow-y-hidden',
          className
        )}
      />
      {tab && (
        <>
          <Sidebar button={<Icon.Music />} side='right'>
            <Controls name={getFilename(file)} tab={tab} />
          </Sidebar>
          <Button
            onClick={() => {
              tab.playPause()
              setTimeout(update, 10)
            }}
            className={tw(
              'fixed bottom-2 left-2 z-[9999]',
              'flex items-center justify-center',
              'aspect-square w-16 rounded-full'
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
        </>
      )}
    </>
  )
}

export default Tab
