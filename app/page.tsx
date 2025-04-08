import { twMerge as tw } from 'tailwind-merge'

import type { PageProps } from '@/lib/types'
import { logout } from '@/lib/actions'
import library from '@/lib/library'
import Tab from '@/lib/components/tab'
import Logo from '@/lib/ui/logo'
import Button from '@/lib/ui/button'
import Sidebar from '@/lib/ui/sidebar'
import FileTree from '@/lib/ui/file-tree'
import Icon from '@/lib/ui/icon'

export const dynamic = 'force-dynamic'

export default async function Library({ searchParams }: PageProps) {
  const tabs = await library()

  let { tab } = await searchParams
  if (Array.isArray(tab)) tab = tab[0]

  return (
    <main
      className={tw(
        'h-screen w-screen overflow-hidden',
        'flex flex-col items-center justify-center gap-4'
      )}
    >
      <Sidebar button={<Icon.Folder />} side='left' isOpen={!tab}>
        <form action={logout}>
          <Button
            type='submit'
            variant='secondary'
            className='mb-2 w-full rounded-sm'
          >
            Sign out
          </Button>
        </form>
        <FileTree root={tabs} />
      </Sidebar>

      {tab ? (
        <Tab file={tab} className='w-full' />
      ) : (
        <>
          <Logo />
          <h1 className='text-4xl font-bold'>↖ select a tab</h1>
        </>
      )}
    </main>
  )
}
