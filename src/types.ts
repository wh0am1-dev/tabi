export type File = string

export interface Directory {
  name: string
  contents: DirectoryContents
}

export type DirectoryContents = (Directory | File)[]
