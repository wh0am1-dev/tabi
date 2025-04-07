'use client'

import type { ComponentPropsWithoutRef, FC } from 'react'
import { useState } from 'react'
import { twMerge as tw } from 'tailwind-merge'

import type { File, Directory } from '@/lib/types'
import Anchor from '@/lib/ui/anchor'
import { redirect } from 'next/navigation'

type FileTreeProps = ComponentPropsWithoutRef<'ul'> & {
  root: Directory
  onFileClick?: () => void
}

export const FileTree: FC<FileTreeProps> = ({
  root,
  onFileClick,
  className,
  ...props
}) => (
  <ul {...props} className={tw('list-none', className)}>
    {root.contents.map(item =>
      item.type === 'file' ? (
        <File key={item.path} root file={item} onClick={onFileClick} />
      ) : (
        <Directory
          key={item.path}
          root
          directory={item}
          onFileClick={onFileClick}
        />
      )
    )}
  </ul>
)

export default FileTree

// ================================

type FileProps = {
  file: File
  root?: boolean
  onClick?: () => void
}

const File: FC<FileProps> = ({ file, root, onClick }) => (
  <li className={tw(!root && 'pl-6')}>
    <Anchor
      className='text-stone-100'
      onClick={() => {
        onClick?.()
        redirect(`/?tab=${encodeURIComponent(file.path)}`)
      }}
    >
      {file.name}
    </Anchor>
  </li>
)

// ================================

type DirectoryProps = {
  directory: Directory
  root?: boolean
  onFileClick?: () => void
}

const Directory: FC<DirectoryProps> = ({ directory, root, onFileClick }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className={tw(!root && 'pl-6')}>
      {isOpen ? '📂' : '📁'}{' '}
      <Anchor onClick={() => setIsOpen(!isOpen)}>{directory.name}</Anchor>
      {isOpen && (
        <ul className='list-none'>
          {directory.contents.map((item, index) =>
            item.type === 'file' ? (
              <File key={index} file={item} onClick={onFileClick} />
            ) : (
              <Directory
                key={index}
                directory={item}
                onFileClick={onFileClick}
              />
            )
          )}
        </ul>
      )}
    </li>
  )
}
