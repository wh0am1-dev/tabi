/**
 * Returns true if run on the server-side, false otherwise
 */
export const isSSR = () => typeof window === 'undefined'

/**
 * Get file name from full path
 * @param file The file to get the name from
 */
export const getFilename = (file: string) => {
  const segments = file.split('/')
  const fileSegments = segments[segments.length - 1].split('.')
  fileSegments.pop()
  return fileSegments.join('.')
}

/**
 * Limits the provided value to [min..max]
 * @param value The value to limit
 * @param min Minimum possible value
 * @param max Maximum possible value
 */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

/**
 * Calculates the normalized, [0..1], position of value between min and max
 * @param value The value to normalize
 * @param min Minimum of the original range
 * @param max Maximum of the original range
 */
export const normalize = (value: number, min: number, max: number) =>
  (value - min) / (max - min)

/**
 * Calculates the modulo of a value
 * @param value Value to calculate the modulo of
 * @param modulo Modulo
 */
export const mod = (value: number, modulo: number) =>
  ((value % modulo) + modulo) % modulo
