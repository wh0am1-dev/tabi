import { useEffect } from 'react'
import { AlphaTabApi } from '@coderline/alphatab'

import useUpdate from '@/lib/hooks/useUpdate'

/**
 * Registers all of the app's keyboard shortcuts
 * @param api AlphaTab instance
 */
export const useShortcuts = (api: AlphaTabApi | undefined) => {
  const update = useUpdate()

  useEffect(() => {
    if (!api) return

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case ' ':
          event.preventDefault()
          api.playPause()
          setTimeout(update, 10)
          break
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [api])
}

export default useShortcuts
