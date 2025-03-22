'use client'

import { useState } from 'react'
import type { FC } from 'react'
import TextInput from '@/ui/text-input'
import { login } from '@/actions'

interface LoginFormProps {}

export const LoginForm: FC<LoginFormProps> = () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  return (
    <form action='foo' className='flex flex-col items-center gap-4'>
      <TextInput
        name='email'
        type='email'
        label='email'
        placeholder='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextInput
        name='password'
        type='password'
        label='password'
        placeholder='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
    </form>
  )
}

export default LoginForm
