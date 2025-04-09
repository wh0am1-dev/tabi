import type { ComponentPropsWithoutRef, FC } from 'react'
import { twMerge as tw } from 'tailwind-merge'

type AnchorProps = ComponentPropsWithoutRef<'a'>

export const Anchor: FC<AnchorProps> = ({ className, ...props }) => (
  <a
    {...props}
    className={tw(
      'text-tabi rounded-sm px-1 font-bold',
      'cursor-pointer transition-colors',
      'hover:bg-tabi hover:text-contrast',
      className
    )}
  />
)

export default Anchor
