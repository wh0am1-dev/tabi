'use client'

import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import cn from 'classnames'

interface TextInputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'name'> {
  name: string
  type: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url'
  label?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ name, label, value, className, ...props }, ref) => (
    <main className='relative mt-5'>
      <AnimatePresence>
        {label && value && (
          <motion.label
            htmlFor={name}
            initial={{ translateY: 2, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: 2, opacity: 0 }}
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
        className={cn(
          'rounded-full px-4 py-2 transition-all',
          'border-2 border-stone-700 outline-none',
          'focus:border-tabi',
          'shadow-tabi hover:shadow focus:shadow-md',
          className
        )}
      />
    </main>
  )
)

TextInput.displayName = 'TextInput'

export default TextInput
