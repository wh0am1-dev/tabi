import { readdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { DirectoryContents } from '@/types'

const extensions = ['.gp', '.gpx', '.gp5', '.gp4', '.gp3']

const isTab = (file: string) => {
  for (const extension of extensions) {
    if (file.endsWith(extension)) return true
  }

  return false
}

const readDirectory = async (dir: string) => {
  const dirents = await readdir(dir, { withFileTypes: true })

  const files: DirectoryContents = await Promise.all(
    dirents.map(async dirent =>
      dirent.isFile()
        ? dirent.name
        : {
            name: dirent.name,
            contents: await readDirectory(resolve(dir, dirent.name))
          }
    )
  )

  return files.filter(file =>
    typeof file === 'string' ? isTab(file) : file.contents.length > 0
  )
}

export const storage = async () =>
  await readDirectory(join(process.cwd(), 'public/tabs'))

export default storage
