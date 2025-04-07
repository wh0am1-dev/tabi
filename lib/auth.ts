import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.APP_SEED,
  providers: [
    Credentials({
      credentials: {
        password: {
          type: 'password',
          label: 'password',
          placeholder: 'password'
        }
      },
      authorize: async credentials => {
        if (credentials.password !== process.env.APP_PASSWORD) return null
        return { id: 'tabi', name: 'tabi' }
      }
    })
  ],
  callbacks: {
    authorized: ({ auth }) => !!auth
  },
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  }
})
