import { isSSR } from '@/lib/utils'

export type StorageKey = 'layout' | 'volume'
const withPrefix = (key: StorageKey) => `tabi:${key}`

type JSONObject = { [key in string]?: Serializable }
type JSONArray = Serializable[]
export type Serializable =
  | string
  | number
  | boolean
  | JSONObject
  | JSONArray
  | null

interface StorageGetter {
  /**
   * Retrieve a value from the local storage
   * @param key The key to retrieve
   * @returns The value if found, null otherwise
   */
  <T extends Serializable>(key: StorageKey): T | null
  /**
   * Retrieve a value from the local storage
   * @param key The key to retrieve
   * @param defaultValue (Optional) Default value to store and return if not already in storage
   * @returns The value if found, or `defaultValue` if provided, or null if none
   */
  <T extends Serializable>(key: StorageKey, defaultValue?: T): T
}

const get: StorageGetter = <T extends Serializable>(
  key: StorageKey,
  defaultValue?: T
) => {
  if (isSSR()) return defaultValue ?? null

  const storedValue = localStorage.getItem(withPrefix(key))
  if (storedValue) return JSON.parse(storedValue) as T

  if (defaultValue) {
    set<T>(key, defaultValue)
    return defaultValue
  }

  return null
}

/**
 * Store a value in the local storage
 * @param key The key to store to
 * @param value The value to store
 */
const set = <T extends Serializable>(key: StorageKey, value: T) => {
  if (isSSR()) return
  localStorage.setItem(withPrefix(key), JSON.stringify(value))
}

/**
 * Remove a value from the local storage
 * @param key The key to remove
 */
const remove = (key: StorageKey) => {
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
  get,
  set,
  remove,
  clear
}

export default storage
