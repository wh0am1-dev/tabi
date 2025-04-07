import type { FC } from 'react'
import { twMerge as tw } from 'tailwind-merge'

type ToggleProps = {
  checked: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
}

export const Toggle: FC<ToggleProps> = ({ checked, disabled, onChange }) => (
  <div
    role='checkbox'
    aria-checked={checked}
    onClick={() => !disabled && onChange?.(!checked)}
    className={tw(
      'relative h-4 w-10 bg-stone-500 align-middle',
      'cursor-pointer rounded-full select-none'
    )}
  >
    <span
      className={tw(
        'absolute -top-1 bottom-0 left-0 h-6 w-6 rounded-full shadow-md',
        'transform transition-transform',
        checked ? 'bg-tabi translate-x-4' : 'bg-stone-100',
        disabled && 'brightness-50'
      )}
    />
  </div>
)

export default Toggle
