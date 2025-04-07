import type { ComponentPropsWithoutRef, FC } from 'react'
import { twMerge as tw } from 'tailwind-merge'

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'secondary'
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => (
  <button
    {...props}
    className={tw(
      'cursor-pointer transition-all',
      'rounded-lg px-2 py-1 font-bold',
      variant === 'primary' && 'bg-tabi text-contrast',
      variant === 'secondary' && 'bg-stone-700',
      'shadow-stone-900 hover:shadow-md hover:brightness-75',
      'focus:outline-none focus-visible:outline-none',
      className
    )}
  >
    {children}
  </button>
)

export default Button
