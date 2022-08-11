import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectToDatabase } from '@helpers/db'
import { verifyPassword } from '@helpers/auth'

export default NextAuth({
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials: Record<string, string> | undefined) {
        const client = await connectToDatabase()

        const usersCollection = client.db().collection('users')

        const user = await usersCollection.findOne({ email: credentials?.email })

        if (!user) {
          client.close()
          throw new Error('No user found.')
        }

        const isValid = await verifyPassword(credentials?.password, user.password)

        if (!isValid) {
          client.close()
          throw new Error('Could not log you in.')
        }

        client.close()
        return { email: user.email } // will be encoded into json webtoken
      }
    })
  ]
})