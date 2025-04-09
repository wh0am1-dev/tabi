import type { FC, PropsWithChildren } from 'react'
import { twMerge as tw } from 'tailwind-merge'

type ToggleProps = PropsWithChildren & {
  active?: boolean
  onClick?: () => void
  className?: string
}

export const Toggle: FC<ToggleProps> = ({
  children,
  active,
  onClick,
  className
}) => (
  <a
    onClick={onClick}
    className={tw(
      'text-tabi rounded-sm px-1 font-bold',
      'cursor-pointer transition-colors',
      'hover:text-contrast',
      active && 'bg-tabi text-contrast hover:bg-tabi',
      className
    )}
  >
    {children}
  </a>
)

export default Toggle
