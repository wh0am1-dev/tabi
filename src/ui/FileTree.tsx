'use client'

import { FC, useState } from 'react'
import cn from 'classnames'
import type { File, Directory, DirectoryContents } from '@/types'

interface FileTreeProps {
  root: DirectoryContents
  className?: string
}

export const FileTree: FC<FileTreeProps> = ({ root, className }) => {
  return (
    <ul className={cn('list-none p-4 text-base', className)}>
      {root.map(item =>
        typeof item === 'string' ? (
          <File key={item} name={item} />
        ) : (
          <Directory key={item.name} directory={item} />
        )
      )}
    </ul>
  )
}

const File: FC<{ name: string }> = ({ name }) => (
  <li className='pl-4'>{name}</li>
)

const Directory: FC<{ directory: Directory }> = ({ directory }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className='pl-4'>
      <a
        className='cursor-pointer text-amber-400 decoration-amber-400 hover:underline'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '📂' : '📁'} {directory.name}
      </a>
      {isOpen && (
        <ul className='list-none pl-4'>
          {directory.contents.map((item, index) =>
            typeof item === 'string' ? (
              <File key={index} name={item} />
            ) : (
              <Directory key={index} directory={item} />
            )
          )}
        </ul>
      )}
    </li>
  )
}

export default FileTree
