'use client'

import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { twMerge as tw } from 'tailwind-merge'
import { AlphaTabApi, LayoutMode } from '@coderline/alphatab'
import isEqual from 'lodash/isEqual'

import useRender from '@/lib/hooks/useRender'
import useLocalStorage from '@/lib/hooks/useLocalStorage'
import Anchor from '@/lib/ui/anchor'
import Range from '@/lib/ui/range'
import Icon from '@/lib/ui/icon'

type ControlsProps = {
  name: string
  tab: AlphaTabApi
}

export const Controls: FC<ControlsProps> = ({ name, tab }) => {
  const render = useRender()

  const [currentTracks, setCurrentTracks] = useState<number[]>([])
  const [multitrack, setMultitrack] = useState<boolean>(true)

  const [volume, setVolume] = useLocalStorage('volume')
  const [notation, setNotation] = useLocalStorage('notation')
  const [layout, setLayout] = useLocalStorage('layout')

  // reset on score loaded
  useEffect(() => {
    const scoreLoaded = () => {
      tab.masterVolume = volume
      setMultitrack(true)
    }

    tab.scoreLoaded.on(scoreLoaded)
    return () => tab.scoreLoaded.off(scoreLoaded)
  }, [tab])

  // update current tracks on render
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

      {/* arrangement */}
      <ul className='flex flex-col gap-4'>
        {/* master volume */}
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

        {/* instruments */}
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
                  setTimeout(render, 10)
                }}
              />
            </label>
          </li>
        ))}
      </ul>

      {/* multitrack */}
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
      <div className='flex w-1/2 justify-between gap-2 self-center'>
        Layout
        <div className='flex gap-2'>
          <Anchor
            onClick={() => {
              setLayout(
                (tab.settings.display.layoutMode = LayoutMode.Horizontal)
              )
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
            className={tw(
              layout === LayoutMode.Page && 'bg-tabi text-contrast'
            )}
          >
            <Icon.ArrowDown />
          </Anchor>
        </div>
      </div>

      <div className='flex w-1/2 justify-between gap-2 self-center'>
        View
        <div className='flex gap-2'>
          <Anchor
            onClick={() => {
              setNotation('tab')
              tab.score?.tracks.forEach(track => {
                track.staves.forEach(staff => {
                  staff.showStandardNotation = false
                  staff.showTablature = true
                })
              })
              tab.render()
            }}
            className={tw(notation === 'tab' && 'bg-tabi text-contrast')}
          >
            <Icon.Tab />
          </Anchor>
          <Anchor
            onClick={() => {
              setNotation('score')
              tab.score?.tracks.forEach(track => {
                track.staves.forEach(staff => {
                  staff.showStandardNotation = true
                  staff.showTablature = false
                })
              })
              tab.render()
            }}
            className={tw(notation === 'score' && 'bg-tabi text-contrast')}
          >
            <Icon.Score />
          </Anchor>
        </div>
      </div>
    </div>
  )
}

export default Controls
