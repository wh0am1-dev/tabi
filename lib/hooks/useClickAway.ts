import type { RefObject } from 'react'
import { useEffect } from 'react'

/**
 * Hook to invoke a callback when the user clicks outside of an element
 * @param ref Element you want to handle out-of-bounds clicks for
 * @param callback Function to be invoked
 */
export const useClickAway = (
  ref: RefObject<HTMLElement | null>,
  callback?: () => void
) => {
  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback?.()
      }
    }

    document.addEventListener('mousedown', handleClickAway)
    return () => {
      document.removeEventListener('mousedown', handleClickAway)
    }
  }, [ref, callback])
}

export default useClickAway
