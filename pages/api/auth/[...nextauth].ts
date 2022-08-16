import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import { connectToUsersDatabase, clientPromise } from '@helpers/db'
import { verifyPassword } from '@helpers/auth'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise), // github
  session: {
    // Set to jwt in order to CredentialsProvider work properly
    strategy: 'jwt'
  },
  callbacks: { // github
    session: ({ session }: any) => ({
      ...session,
    })
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    GitHubProvider({ // github
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          email: profile.email
        }
      }
    }),
    CredentialsProvider({
      credentials: {},
      async authorize(credentials: any) {
        try {
          const client = await connectToUsersDatabase()

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
        } catch (e) {
          return null // throws 401 (Unauthorized)
        }
      }
    })
  ]
}

export default NextAuth(authOptions)