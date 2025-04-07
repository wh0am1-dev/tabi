'use client'

import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { twMerge as tw } from 'tailwind-merge'

interface TextInputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'name'> {
  name: string
  type: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url'
  label?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ name, label, value, onChange, className, ...props }, ref) => {
    const [showLabel, setShowLabel] = useState(!!value)

    return (
      <main className='relative mt-5'>
        <AnimatePresence>
          {label && showLabel && (
            <motion.label
              htmlFor={name}
              initial={{ translateY: 2, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              exit={{ translateY: 2, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className='absolute -top-5 left-4 text-xs'
            >
              {label}
            </motion.label>
          )}
        </AnimatePresence>
        <input
          ref={ref}
          name={name}
          {...props}
          onChange={e => {
            setShowLabel(!!e.target.value)
            onChange?.(e)
          }}
          className={tw(
            'px-4 py-2 transition-all',
            'rounded-full border-2 outline-none',
            'border-stone-700 shadow-stone-900',
            'hover:-translate-y-0.5 hover:shadow-md',
            'focus:border-tabi focus:-translate-y-0.5 focus:shadow-md',
            className
          )}
        />
      </main>
    )
  }
)

TextInput.displayName = 'TextInput'

export default TextInput
