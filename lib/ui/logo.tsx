import type { FC } from 'react'
import { twMerge as tw } from 'tailwind-merge'

type LogoProps = {
  className?: string
}

export const Logo: FC<LogoProps> = ({ className }) => (
  <div className={tw('flex flex-col items-center gap-2', className)}>
    <h1 className='text-tabi font-kana text-8xl font-bold'>たび</h1>
    <div className='mt-2 flex w-full justify-around'>
      <span>ta</span>
      <span>bi</span>
    </div>
  </div>
)

export default Logo
