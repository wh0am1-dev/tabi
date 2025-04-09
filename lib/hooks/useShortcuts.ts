import { RefObject, useEffect } from 'react'
import { AlphaTabApi } from '@coderline/alphatab'

/**
 * Registers all of the tab keyboard shortcuts
 * @param api AlphaTab instance
 */
export const useShortcuts = (
  api: AlphaTabApi | undefined,
  element: RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    if (!api) return

    const onKeyDown = (event: KeyboardEvent) => {
      console.debug('[key]', event.key)

      switch (event.key) {
        case ' ':
          event.preventDefault()
          api.playPause()
          break

        case 'Backspace':
          event.preventDefault()
          element.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          api.stop()
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
