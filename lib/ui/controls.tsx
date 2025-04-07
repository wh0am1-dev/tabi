'use client'

import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { twMerge as tw } from 'tailwind-merge'
import { AlphaTabApi, LayoutMode } from '@coderline/alphatab'
import isEqual from 'lodash/isEqual'

import useUpdate from '@/lib/hooks/useUpdate'
import useLocalStorage from '@/lib/hooks/useLocalStorage'
import Anchor from '@/lib/ui/anchor'
import Range from '@/lib/ui/range'
import Icon from '@/lib/ui/icon'

type ControlsProps = {
  name: string
  tab: AlphaTabApi
}

export const Controls: FC<ControlsProps> = ({ name, tab }) => {
  const update = useUpdate()
  const [multitrack, setMultitrack] = useState<boolean>(true)
  const [currentTracks, setCurrentTracks] = useState<number[]>([])
  const [volume, setVolume] = useLocalStorage<number>('volume', 1)
  const [layout, setLayout] = useLocalStorage<LayoutMode>(
    'layout',
    LayoutMode.Horizontal
  )

  useEffect(() => {
    const scoreLoaded = () => {
      tab.masterVolume = volume
      setMultitrack(true)
    }

    tab.scoreLoaded.on(scoreLoaded)
    return () => tab.scoreLoaded.off(scoreLoaded)
  }, [tab])

  useEffect(() => {
    const renderStarted = () => {
      const allTracks = tab.score?.tracks.map(track => track.index)
      const currentTracks = tab.tracks.map(track => track.index)
      setCurrentTracks(currentTracks)
      setMultitrack(isEqual(currentTracks, allTracks))
    }

    tab.renderStarted.on(renderStarted)
    return () => tab.renderStarted.off(renderStarted)
  }, [tab])

  return (
    <div className='flex max-w-full flex-col gap-4'>
      {/* song info */}
      <div>
        <h1 className='text-center text-xl font-bold'>{name}</h1>
        {(tab.score?.artist || tab.score?.music) && (
          <h2 className='text-center text-sm'>
            {tab.score.artist || tab.score.music}
          </h2>
        )}
        {tab.score?.album && (
          <h2 className='text-center text-sm'>{tab.score.album}</h2>
        )}
      </div>

      <hr />

      {/* instruments */}
      <ul className='flex flex-col gap-4'>
        <li className='flex flex-col'>
          <label className='flex w-full items-center gap-2 px-2'>
            Master
            <Range
              min={0}
              max={1}
              step={0.01}
              value={tab.masterVolume}
              className='grow'
              onChange={event => {
                setVolume((tab.masterVolume = +event.target.value))
              }}
            />
          </label>
        </li>

        {tab?.score?.tracks.map((track, index) => (
          <li key={`${track.name}-${index}`} className='flex flex-col'>
            <Anchor
              onClick={() => tab.renderTracks([track])}
              className={tw(
                !multitrack &&
                  currentTracks.includes(track.index) &&
                  'bg-tabi text-contrast'
              )}
            >
              {track.name || `unknown ${index + 1}`}
            </Anchor>

            <label className='flex w-full items-center gap-2 px-2'>
              Volume
              <Range
                min={0}
                max={1}
                step={0.01}
                value={track.playbackInfo.volume}
                className='grow'
                onChange={event => {
                  tab.changeTrackVolume(
                    [track],
                    (track.playbackInfo.volume = +event.target.value)
                  )
                  setTimeout(update, 10)
                }}
              />
            </label>
          </li>
        ))}
      </ul>

      <Anchor
        onClick={() => tab.renderTracks(tab.score?.tracks ?? [])}
        className={tw(
          'w-fit self-center',
          multitrack && 'bg-tabi text-contrast'
        )}
      >
        Multitrack
      </Anchor>

      <hr />

      {/* view */}
      <div className='flex justify-center gap-2'>
        Layout:
        <Anchor
          onClick={() => {
            setLayout((tab.settings.display.layoutMode = LayoutMode.Horizontal))
            tab.updateSettings()
            tab.render()
          }}
          className={tw(
            layout === LayoutMode.Horizontal && 'bg-tabi text-contrast'
          )}
        >
          <Icon.ArrowRight />
        </Anchor>
        <Anchor
          onClick={() => {
            setLayout((tab.settings.display.layoutMode = LayoutMode.Page))
            tab.updateSettings()
            tab.render()
          }}
          className={tw(layout === LayoutMode.Page && 'bg-tabi text-contrast')}
        >
          <Icon.ArrowDown />
        </Anchor>
      </div>
    </div>
  )
}

export default Controls
