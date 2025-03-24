import LoginForm from '@/ui/login-form'
export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <main className='min-h-mobile flex w-screen flex-col items-center justify-center gap-8'>
      <div className='flex flex-col items-center gap-2'>
        <h1 className='text-tabi font-kana'>たび</h1>
        <div className='mt-2 flex w-full justify-around'>
          <span>ta</span>
          <span>bi</span>
        </div>
      </div>

      <LoginForm />
    </main>
  )
}
