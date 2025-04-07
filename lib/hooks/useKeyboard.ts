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
    const handler = (event: KeyboardEvent) => shortcuts[event.key]?.(event)
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useKeyboard
