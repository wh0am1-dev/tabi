import type { PageProps } from '@/lib/types'
import { login } from '@/lib/actions'
import Logo from '@/lib/ui/logo'
import Button from '@/lib/ui/button'
import TextInput from '@/lib/ui/text-input'

export default async function Login({ searchParams }: PageProps) {
  const { error } = await searchParams

  return (
    <main className='flex h-screen w-screen flex-col items-center justify-center'>
      <Logo />
      <form action={login} className='flex flex-col items-center gap-4'>
        <TextInput
          type='text'
          name='username'
          autoComplete='username'
          label='Username'
          placeholder='Username'
          className='hidden'
        />
        <TextInput
          type='password'
          name='password'
          label='Password'
          autoComplete='current-password'
          placeholder={error ? 'Wrong password !' : 'Password'}
        />
        <Button type='submit'>Login</Button>
      </form>
    </main>
  )
}
