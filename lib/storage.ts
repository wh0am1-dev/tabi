import { LayoutMode } from '@coderline/alphatab'
import { isSSR } from '@/lib/utils'

/**
 * Storage data structure
 */
export interface Storage {
  /** Layout of the tab (page = 0 | horizontal = 1) */
  layout: LayoutMode
  /** Music notation ('tab' | 'score') */
  notation: 'tab' | 'score'
  /** Master volume in range [0..1] */
  volume: number
}

/**
 * Default storage values
 */
const defaults: Storage = {
  layout: LayoutMode.Horizontal,
  notation: 'tab',
  volume: 1
}

/**
 * Prepend prefix to storage keys
 * @param key the key to prepend to
 */
const withPrefix = (key: keyof Storage) => `tabi:${key}`

/**
 * Retrieve a value from the local storage
 * @param key The key to retrieve
 * @returns The value if found in the storage, otherwise returns its default value
 */
const get = <T extends keyof Storage>(key: T): Storage[T] => {
  if (!isSSR()) {
    const storedValue = localStorage.getItem(withPrefix(key))
    if (storedValue) return JSON.parse(storedValue)
  }

  return defaults[key]
}

/**
 * Store a value in the local storage
 * @param key The key to store to
 * @param value The value to store
 */
const set = <T extends keyof Storage>(key: T, value: Storage[T]) => {
  if (isSSR()) return
  localStorage.setItem(withPrefix(key), JSON.stringify(value))
}

/**
 * Remove a value from the local storage
 * @param key The key to remove
 */
const remove = (key: keyof Storage) => {
  if (isSSR()) return
  localStorage.removeItem(withPrefix(key))
}

/**
 * Clears the local storage
 */
const clear = () => {
  if (isSSR()) return
  localStorage.clear()
}

export const storage = {
  defaults,
  get,
  set,
  remove,
  clear
}

export default storage
