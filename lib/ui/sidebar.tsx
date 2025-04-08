'use client'

import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react'
import { useRef, useState } from 'react'
import { twMerge as tw } from 'tailwind-merge'

import useClickAway from '@/lib/hooks/useClickAway'
import useKeyboard from '@/lib/hooks/useKeyboard'
import Button from '@/lib/ui/button'

type SidebarProps = ComponentPropsWithoutRef<'aside'> & {
  button?: ReactNode
  side?: 'left' | 'right'
  isOpen?: boolean
  onClose?: () => void
}

export const Sidebar: FC<SidebarProps> = ({
  children,
  button = 'sidebar',
  side = 'left',
  isOpen: isOpenInit = false,
  className,
  ...props
}) => {
  const container = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(isOpenInit)

  useClickAway(container, () => setIsOpen(false))
  useKeyboard({ Escape: () => setIsOpen(false) }, [])

  return (
    <aside
      {...props}
      className={tw(
        'fixed top-2 z-[999999] max-h-11/12',
        'flex gap-2 transition-transform',
        side === 'left' ? 'left-2' : 'right-2',
        !isOpen && (side === 'left' ? '-translate-x-82' : 'translate-x-82'),
        className
      )}
    >
      {side === 'right' && (
        <Button
          onClick={() => setIsOpen(isOpen => !isOpen)}
          className='font-emoji h-fit text-xl'
        >
          {button}
        </Button>
      )}

      <div
        ref={container}
        className={tw(
          'max-h-full w-80 rounded-lg p-2',
          'bg-stone-900 shadow-lg shadow-stone-900',
          'overflow-y-auto transition-opacity',
          !isOpen && 'opacity-0'
        )}
      >
        {children}
      </div>

      {side === 'left' && (
        <Button
          onClick={() => setIsOpen(isOpen => !isOpen)}
          className='font-emoji h-fit text-xl'
        >
          {button}
        </Button>
      )}
    </aside>
  )
}

export default Sidebar
