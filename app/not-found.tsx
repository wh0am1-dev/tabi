import Link from '@/lib/ui/link'

export default function NotFound() {
  return (
    <main className='flex h-screen w-screen flex-col items-center justify-center gap-4'>
      <h1 className='text-6xl font-bold'>not found</h1>
      <p className='text-center'>could not find requested resource</p>
      <Link href='/'>go home</Link>
    </main>
  )
}
