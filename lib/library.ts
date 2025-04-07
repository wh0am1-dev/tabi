import { Dirent } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'

import type { Directory, File } from '@/lib/types'

const LIBRARY_PATH = '/tabs'
const extensions = ['.gp', '.gpx', '.gp5', '.gp4', '.gp3']

/**
 * Modifies a path to remove machine-related parent folders
 * @param path The path to parse
 */
const cleanPath = (path: string) =>
  path.match(new RegExp(`${LIBRARY_PATH}.*$`))?.[0] ?? '/404'

/**
 * Checks whether a file is a valid tab
 * @param file File to check
 */
const isTab = (file: File) => {
  for (const extension of extensions) {
    if (file.name.endsWith(extension)) return true
  }

  return false
}

/**
 * Parses a directory entity
 * @param dirent The `Dirent` object to parse
 */
const parseDirent = async (dirent: Dirent): Promise<File | Directory> => {
  const path = resolve(dirent.parentPath, dirent.name)

  if (dirent.isFile()) {
    return {
      type: 'file',
      name: dirent.name,
      path: cleanPath(path)
    } as File
  }

  return {
    type: 'directory',
    name: dirent.name,
    path: cleanPath(path),
    contents: await readContents(path)
  } as Directory
}

/**
 * Reads and builds a data structure that represents the contents of a directory
 * @param path Directory absolute path
 */
const readContents = async (path: string): Promise<(File | Directory)[]> => {
  const dirents = await readdir(path, { withFileTypes: true })
  const contents = await Promise.all(dirents.map(parseDirent))

  return contents
    .filter(item =>
      item.type === 'file' ? isTab(item) : item.contents.length > 0
    )
    .sort((a, _) => (a.type === 'file' ? 1 : 0))
}

/**
 * Reads the contents of the default library directory
 */
export const library = async (): Promise<Directory> => ({
  type: 'directory',
  name: ':root',
  path: '/',
  contents: await readContents(join(process.cwd(), `public/${LIBRARY_PATH}`))
})

export default library
