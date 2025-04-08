import { useEffect } from 'react'
import { AlphaTabApi } from '@coderline/alphatab'

/**
 * Registers all of the tab keyboard shortcuts
 * @param api AlphaTab instance
 */
export const useShortcuts = (api?: AlphaTabApi) => {
  useEffect(() => {
    if (!api) return

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case ' ':
          event.preventDefault()
          api.playPause()
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [api])
}

export default useShortcuts
