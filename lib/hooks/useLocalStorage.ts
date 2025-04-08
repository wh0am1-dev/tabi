import { useCallback, useState } from 'react'

import type { Storage } from '@/lib/storage'
import storage from '@/lib/storage'

/**
 * A hook to interface with the local storage
 * @param key The key to manage
 * @returns A tuple containing the value, a setter and a remover
 * @example const [value, set, remove] = useLocalStorage('key')
 */
export const useLocalStorage = <T extends keyof Storage>(
  key: T
): [Storage[T], (value: Storage[T]) => void, () => void] => {
  const [value, setValue] = useState<Storage[T]>(storage.get(key))

  const set = useCallback(
    (value: Storage[T]) => {
      storage.set(key, value)
      setValue(value)
    },
    [key]
  )

  const remove = useCallback(() => storage.remove(key), [key])

  return [value, set, remove]
}

export default useLocalStorage
