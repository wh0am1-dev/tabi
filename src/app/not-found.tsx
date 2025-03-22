import Link from 'next/link'

export default function NotFound() {
  return (
    <main className='flex h-screen w-screen flex-col items-center justify-center gap-4'>
      <h2>not found</h2>
      <p>could not find requested resource</p>
      <Link href='/'>go home</Link>
    </main>
  )
}
