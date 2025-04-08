import type { FC, ComponentPropsWithoutRef } from 'react'
import { twMerge as tw } from 'tailwind-merge'

type IconProps = ComponentPropsWithoutRef<'svg'>

const ArrowDown: FC<IconProps> = ({ className, ...props }) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className={tw('w-6', className)}
  >
    <path
      d='M12 2.25a.75.75 0 0 1 .75.75v16.19l6.22-6.22a.75.75 0 1 1 1.06 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 1 1 1.06-1.06l6.22 6.22V3a.75.75 0 0 1 .75-.75Z'
      clipRule='evenodd'
      fillRule='evenodd'
    />
  </svg>
)

const ArrowRight: FC<IconProps> = ({ className, ...props }) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className={tw('w-6', className)}
  >
    <path
      d='M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z'
      clipRule='evenodd'
      fillRule='evenodd'
    />
  </svg>
)

const Folder: FC<IconProps> = ({ className, ...props }) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className={tw('w-6', className)}
  >
    <path d='M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z' />
  </svg>
)

const FullscreenOn: FC<IconProps> = ({ className, ...props }) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className={tw('w-6', className)}
  >
    <path
      d='M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z'
      clipRule='evenodd'
      fillRule='evenodd'
    />
  </svg>
)

const FullscreenOff: FC<IconProps> = ({ className, ...props }) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className={tw('w-6', className)}
  >
    <path
      d='M3.22 3.22a.75.75 0 0 1 1.06 0l3.97 3.97V4.5a.75.75 0 0 1 1.5 0V9a.75.75 0 0 1-.75.75H4.5a.75.75 0 0 1 0-1.5h2.69L3.22 4.28a.75.75 0 0 1 0-1.06Zm17.56 0a.75.75 0 0 1 0 1.06l-3.97 3.97h2.69a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75V4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0ZM3.75 15a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-2.69l-3.97 3.97a.75.75 0 0 1-1.06-1.06l3.97-3.97H4.5a.75.75 0 0 1-.75-.75Zm10.5 0a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-2.69l3.97 3.97a.75.75 0 1 1-1.06 1.06l-3.97-3.97v2.69a.75.75 0 0 1-1.5 0V15Z'
      clipRule='evenodd'
      fillRule='evenodd'
    />
  </svg>
)

const Music: FC<IconProps> = ({ className, ...props }) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className={tw('w-6', className)}
  >
    <path
      d='M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z'
      clipRule='evenodd'
      fillRule='evenodd'
    />
  </svg>
)

const Pause: FC<IconProps> = ({ className, ...props }) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className={tw('w-6', className)}
  >
    <path
      d='M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z'
      clipRule='evenodd'
      fillRule='evenodd'
    ></path>
  </svg>
)

const Play: FC<IconProps> = ({ className, ...props }) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className={tw('w-6', className)}
  >
    <path
      d='M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z'
      clipRule='evenodd'
      fillRule='evenodd'
    />
  </svg>
)

const Score: FC<IconProps> = ({ className, ...props }) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className={tw('w-6', className)}
  >
    <path d='M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z' />
  </svg>
)

const Tab: FC<IconProps> = ({ className, ...props }) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className={tw('w-6', className)}
  >
    <path
      d='M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
      clipRule='evenodd'
      fillRule='evenodd'
    />
  </svg>
)

export const Icon = {
  ArrowDown,
  ArrowRight,
  Folder,
  FullscreenOn,
  FullscreenOff,
  Music,
  Pause,
  Play,
  Score,
  Tab
}

export default Icon
