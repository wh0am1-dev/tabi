import { useReducer } from 'react'

/**
 * Hook to force a component render manually
 */
export const useRender = () => {
  const [, render] = useReducer(x => (x + 1) % 2, 0)
  return render
}

export default useRender
