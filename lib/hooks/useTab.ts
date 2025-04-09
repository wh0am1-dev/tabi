import { RefObject, useEffect, useState } from 'react'
import { AlphaTabApi } from '@coderline/alphatab'

import useLocalStorage from '@/lib/hooks/useLocalStorage'

/**
 * Initialize AlphaTab instance
 * @param file Path of the tab to load
 * @param element Ref of the HTMLDivElement to render the tab to
 */
export const useTab = (
  file: string,
  element: RefObject<HTMLDivElement | null>
) => {
  const [tab, setTab] = useState<AlphaTabApi>()
  const [layout] = useLocalStorage('layout')
  const [notation] = useLocalStorage('notation')

  // initialize alphatab
  useEffect(() => {
    const tab = new AlphaTabApi(element.current!, {
      core: {
        fontDirectory: '/alphatab/font/',
        tracks: 'all'
      },
      display: {
        justifyLastSystem: true,
        layoutMode: layout,
        resources: {
          barNumberColor: '#f5f5f4',
          barSeparatorColor: '#f5f5f4',
          mainGlyphColor: '#f5f5f4',
          scoreInfoColor: '#f5f5f4',
          staffLineColor: '#57534e',
          secondaryGlyphColor: '#78716c'
        }
      },
      notation: {
        notationMode: 'GuitarPro',
        fingeringMode: 'SingleNoteEffectBand',
        elements: {
          // @ts-ignore
          scoreTitle: false,
          scoreSubTitle: false,
          scoreArtist: false,
          scoreAlbum: false,
          scoreWords: false,
          scoreMusic: false,
          scoreWordsAndMusic: false,
          scoreCopyright: false,
          guitarTuning: false,
          trackNames: false,
          chordDiagrams: false
        }
      },
      player: {
        enablePlayer: true,
        enableCursor: true,
        enableUserInteraction: true,
        enableElementHighlighting: true,
        scrollMode: 'OffScreen',
        scrollElement: element.current!,
        scrollOffsetX: -32,
        scrollOffsetY: -16,
        scrollSpeed: 10,
        nativeBrowserSmoothScroll: true,
        soundFont: '/alphatab/soundfont/sonivox.sf2'
      }
    })

    setTab(tab)

    return () => {
      tab.destroy()
    }
  }, [])

  // load file if changed
  useEffect(() => {
    if (!tab) return
    tab.pause()
    tab.load(file)
  }, [tab, file])

  // initialize tab settings upon load
  useEffect(() => {
    if (!tab) return

    const reset: Parameters<typeof tab.scoreLoaded.on>[0] = score => {
      tab.renderTracks([score.tracks[0]])
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })

      score.tracks.forEach(track => {
        track.playbackInfo.volume = 16
        track.playbackInfo.balance = 8
        track.staves.forEach(staff => {
          staff.showStandardNotation = notation === 'score'
          staff.showTablature = notation === 'tab'
        })
      })
    }

    tab.scoreLoaded.on(reset)
    return () => {
      tab.scoreLoaded.off(reset)
    }
  }, [tab, notation])

  return tab
}

export default useTab
