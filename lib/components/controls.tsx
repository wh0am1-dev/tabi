'use client'

import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { twMerge as tw } from 'tailwind-merge'
import { AlphaTabApi, LayoutMode } from '@coderline/alphatab'
import isEqual from 'lodash/isEqual'

import useRender from '@/lib/hooks/useRender'
import useLocalStorage from '@/lib/hooks/useLocalStorage'
import Range from '@/lib/ui/range'
import Icon from '@/lib/ui/icon'
import Toggle from '../ui/toggle'

type ControlsProps = {
  name: string
  tab: AlphaTabApi
}

export const Controls: FC<ControlsProps> = ({ name, tab }) => {
  const render = useRender()

  const [currentTracks, setCurrentTracks] = useState<number[]>([])
  const [multitrack, setMultitrack] = useState<boolean>(true)

  const [layout, setLayout] = useLocalStorage('layout')
  const [notation, setNotation] = useLocalStorage('notation')
  const [loop, setLoop] = useLocalStorage('loop')
  const [metronome, setMetronome] = useLocalStorage('metronome')
  const [count, setCount] = useLocalStorage('count')
  const [speed, setSpeed] = useLocalStorage('speed')
  const [volume, setVolume] = useLocalStorage('volume')

  // reset on score loaded
  useEffect(() => {
    const scoreLoaded = () => {
      tab.isLooping = loop
      tab.metronomeVolume = metronome
      tab.countInVolume = count
      tab.playbackSpeed = speed
      tab.masterVolume = volume
      setMultitrack(false)
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

      {/* view */}
      <div className='flex flex-col gap-4 px-2'>
        <div className='flex justify-between'>
          Layout
          <div className='flex gap-2'>
            <Toggle
              active={layout === LayoutMode.Horizontal}
              onClick={() => {
                setLayout(
                  (tab.settings.display.layoutMode = LayoutMode.Horizontal)
                )
                tab.updateSettings()
                tab.render()
              }}
            >
              <Icon.ArrowRight />
            </Toggle>
            <Toggle
              active={layout === LayoutMode.Page}
              onClick={() => {
                setLayout((tab.settings.display.layoutMode = LayoutMode.Page))
                tab.updateSettings()
                tab.render()
              }}
            >
              <Icon.ArrowDown />
            </Toggle>
          </div>
        </div>

        <div className='flex justify-between'>
          Notation
          <div className='flex gap-2'>
            <Toggle
              active={notation === 'tab'}
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
            >
              <Icon.Tab />
            </Toggle>
            <Toggle
              active={notation === 'score'}
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
            >
              <Icon.Score />
            </Toggle>
          </div>
        </div>
      </div>

      <hr />

      {/* metronome */}
      <div className='flex flex-col gap-4 px-2'>
        <div className='flex justify-between'>
          Loop
          <div className='flex gap-2'>
            <Toggle
              active={tab.isLooping}
              onClick={() => setLoop((tab.isLooping = !tab.isLooping))}
            >
              <Icon.Loop />
            </Toggle>
          </div>
        </div>
        <div className='flex justify-between'>
          Metronome
          <div className='flex gap-2'>
            <Toggle
              active={tab.metronomeVolume > 0}
              onClick={() => {
                setMetronome(
                  (tab.metronomeVolume = tab.metronomeVolume > 0 ? 0 : 1)
                )
              }}
            >
              <Icon.Power />
            </Toggle>
          </div>
        </div>
        <div className='flex justify-between'>
          Count-in
          <div className='flex gap-2'>
            <Toggle
              active={tab.countInVolume > 0}
              onClick={() => {
                setCount((tab.countInVolume = tab.countInVolume > 0 ? 0 : 1))
              }}
            >
              <Icon.Clock />
            </Toggle>
          </div>
        </div>
        <label className='flex w-full items-center gap-2'>
          <span className='w-12'>Speed</span>
          <Range
            min={0.2}
            max={1}
            step={0.1}
            value={tab.playbackSpeed}
            className='grow'
            onChange={event => {
              setSpeed((tab.playbackSpeed = +event.target.value))
            }}
          />
          <span className='w-10 text-right'>{tab.playbackSpeed * 100}%</span>
        </label>
      </div>

      <hr />

      {/* arrangement */}
      <ul className='flex flex-col gap-4'>
        {/* master volume */}
        <li className='flex flex-col gap-1 px-1'>
          <span className='px-1'>Master</span>
          <label className='flex w-full items-center gap-2 px-1'>
            <Icon.Volume />
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
            <span className='w-10 text-right'>
              {Math.round(tab.masterVolume * 100)}%
            </span>
          </label>
        </li>

        {/* instruments */}
        {tab.score?.tracks.map((track, index) => (
          <li
            key={`${track.name}-${index}`}
            className='flex flex-col gap-1 px-1'
          >
            <div className='flex justify-between'>
              <Toggle
                active={!multitrack && currentTracks.includes(track.index)}
                onClick={() => tab.renderTracks([track])}
              >
                {track.name || `unknown ${index + 1}`}
              </Toggle>
              <div className='flex gap-2'>
                <Toggle
                  active={track.playbackInfo.isMute}
                  onClick={() => {
                    tab.changeTrackMute(
                      [track],
                      (track.playbackInfo.isMute = !track.playbackInfo.isMute)
                    )
                    render()
                  }}
                >
                  <Icon.Mute />
                </Toggle>
                <Toggle
                  active={track.playbackInfo.isSolo}
                  onClick={() => {
                    tab.changeTrackSolo(
                      [track],
                      (track.playbackInfo.isSolo = !track.playbackInfo.isSolo)
                    )
                    render()
                  }}
                >
                  <Icon.Solo />
                </Toggle>
              </div>
            </div>

            <label className='flex w-full items-center gap-2 px-1'>
              <Icon.Volume />
              <Range
                min={0}
                max={1}
                step={0.01}
                value={track.playbackInfo.volume / 16}
                className='grow'
                onChange={event => {
                  const vol = +event.target.value
                  track.playbackInfo.volume = vol * 16
                  tab.changeTrackVolume([track], vol)
                  render()
                }}
              />
              <span className='w-10 text-right'>
                {Math.round((track.playbackInfo.volume / 16) * 100)}%
              </span>
            </label>
          </li>
        ))}
      </ul>

      <Toggle
        active={multitrack}
        onClick={() => tab.renderTracks(tab.score?.tracks ?? [])}
        className='self-center'
      >
        View all
      </Toggle>
    </div>
  )
}

export default Controls
