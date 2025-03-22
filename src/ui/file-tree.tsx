'use client'

import { FC, useState } from 'react'
import cn from 'classnames'
import type { File, Directory, DirectoryContents } from '@/types'

interface FileTreeProps {
  root: DirectoryContents
  className?: string
}

export const FileTree: FC<FileTreeProps> = ({ root, className }) => (
  <ul className={cn('list-none p-4 text-xs', className)}>
    {root.map(item =>
      typeof item === 'string' ? (
        <File key={item} name={item} />
      ) : (
        <Directory key={item.name} directory={item} />
      )
    )}
  </ul>
)

const File: FC<{ name: File }> = ({ name }) => <li className='pl-4'>{name}</li>

const Directory: FC<{ directory: Directory }> = ({ directory }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className='pl-4'>
      {isOpen ? '📂' : '📁'}{' '}
      <a
        className='text-tabi decoration-tabi cursor-pointer hover:underline'
        onClick={() => setIsOpen(!isOpen)}
      >
        {directory.name}
      </a>
      {isOpen && (
        <ul className='list-none'>
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
