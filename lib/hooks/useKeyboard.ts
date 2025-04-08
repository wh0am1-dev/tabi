import { DependencyList, useEffect } from 'react'

type Shortcuts = {
  [key in string]?: (event: KeyboardEvent) => void
}

/**
 * Attaches keydown event listeners to the window
 * @param shortcuts object with key mappings
 * @param deps depencendy array
 */
export const useKeyboard = (shortcuts: Shortcuts, deps?: DependencyList) => {
  useEffect(() => {
    const keymap = (event: KeyboardEvent) => {
      const handler = shortcuts[event.key]
      if (handler) {
        event.preventDefault()
        handler(event)
      }
    }

    window.addEventListener('keydown', keymap)
    return () => window.removeEventListener('keydown', keymap)
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useKeyboard
