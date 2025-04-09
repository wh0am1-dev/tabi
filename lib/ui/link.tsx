import type { ComponentPropsWithoutRef, FC } from 'react'
import { default as NextLink } from 'next/link'
import { twMerge as tw } from 'tailwind-merge'

type LinkProps = ComponentPropsWithoutRef<typeof NextLink>

export const Link: FC<LinkProps> = ({ className, ...props }) => (
  <NextLink
    {...props}
    className={tw(
      'text-tabi px-1 font-bold transition-colors',
      'hover:bg-tabi hover:text-contrast',
      className
    )}
  />
)

export default Link
