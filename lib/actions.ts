'use server'

import { redirect, RedirectType } from 'next/navigation'
import { AuthError } from 'next-auth'

import { signIn, signOut } from '@/lib/auth'

/**
 * Login the user into app
 * @param formData login form data, should contain a single field "password"
 */
export const login = async (formData: FormData) => {
  try {
    await signIn('credentials', {
      password: formData.get('password'),
      redirectTo: '/'
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect('/login?error=true', RedirectType.replace)
    }

    throw error
  }
}

/**
 * Logout the user
 */
export const logout = async () => {
  await signOut({ redirectTo: '/login' })
}
