import { useCallback, useState } from 'react'

import type { StorageKey, Serializable } from '@/lib/storage'
import storage from '@/lib/storage'

interface UseLocalStorageHook {
  /**
   * A hook to interface with the local storage
   * @param key The key to manage
   * @returns A tuple containing the value, a setter and a remover
   * @example const [value, set, remove] = useLocalStorage('key')
   */
  <T extends Serializable>(
    key: StorageKey
  ): [T | null, (value: T) => void, () => void]

  /**
   * A hook to interface with the local storage
   * @param key The key to manage
   * @returns A tuple containing the value, a setter and a remover
   * @example const [value, set, remove] = useLocalStorage('key')
   */
  <T extends Serializable>(
    key: StorageKey,
    defaultValue: T
  ): [T, (value: T) => void, () => void]
}

export const useLocalStorage: UseLocalStorageHook = <T extends Serializable>(
  key: StorageKey,
  defaultValue?: T
): [T | null, (value: T) => void, () => void] => {
  const [value, setValue] = useState<T | null>(
    storage.get<T>(key, defaultValue)
  )

  const set = useCallback(
    (value: T) => {
      storage.set<T>(key, value)
      setValue(value)
    },
    [key]
  )

  const remove = useCallback(() => storage.remove(key), [key])

  return [value, set, remove]
}

export default useLocalStorage
