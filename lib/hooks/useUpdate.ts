import { useReducer } from 'react'

/**
 * Hook to force a component render manually
 */
export const useUpdate = () => {
  const [, update] = useReducer(x => (x + 1) % 2, 0)
  return update
}

export default useUpdate
