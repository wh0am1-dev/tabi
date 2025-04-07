'use client'

import type { ComponentPropsWithoutRef, FC } from 'react'
import { useEffect, useRef } from 'react'
import { twMerge as tw } from 'tailwind-merge'

import { normalize } from '@/lib/utils'

type RangeProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'type' | 'value' | 'min' | 'max'
> & {
  value: number
  min: number
  max: number
}

export const Range: FC<RangeProps> = ({
  value,
  min,
  max,
  className,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    ref.current?.style.setProperty(
      '--progress',
      `${normalize(value, min, max)}`
    )
  }, [value, min, max])

  return (
    <input
      ref={ref}
      type='range'
      value={value}
      min={min}
      max={max}
      {...props}
      className={tw('range', className)}
    />
  )
}

export default Range
