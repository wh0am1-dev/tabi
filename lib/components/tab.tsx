'use client'

import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import { twMerge as tw } from 'tailwind-merge'
import { LayoutMode } from '@coderline/alphatab'

import useShortcuts from '@/lib/hooks/useShortcuts'
import useTab from '@/lib/hooks/useTab'
import Controls from '@/lib/components/controls'
import Fullscreen from '@/lib/components/fullscreen'
import PlayPause from '@/lib/components/play-pause'
import Sidebar from '@/lib/ui/sidebar'
import Icon from '@/lib/ui/icon'
import { getFilename } from '@/lib/utils'

type TabProps = {
  file: string
  className?: string
}

export const Tab: FC<TabProps> = ({ file, className }) => {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>()
  const element = useRef<HTMLDivElement>(null)
  const tab = useTab(file, element)

  useShortcuts(tab)

  // set layout mode state upon render
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
          layoutMode === LayoutMode.Horizontal
            ? 'overflow-x-auto overflow-y-hidden'
            : 'overflow-x-hidden overflow-y-auto',
          className
        )}
      />

      {tab && (
        <>
          <Sidebar button={<Icon.Music />} side='right'>
            <Controls name={getFilename(file)} tab={tab} />
          </Sidebar>
          <PlayPause tab={tab} className='fixed bottom-2 left-2 z-[9999]' />
        </>
      )}

      <Fullscreen className='fixed right-2 bottom-2 z-[9999]' />
    </>
  )
}

export default Tab
