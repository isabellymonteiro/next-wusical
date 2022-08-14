import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@helpers/db'
import { hashPassword, verifyPassword } from '@helpers/auth'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return
  }

  try {
    /* every API route that does something that should only be allowed
    to authenticated users needs the code below (lines 15 - 20) */
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      res.status(401).json({ message: 'You must be logged in.' })
      return
    }

    const userEmail = session?.user?.email
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword

    const client = await connectToDatabase()
    const usersCollection = client.db().collection('users')
    const user = await usersCollection.findOne({ email: userEmail })

    if (!user) {
      res.status(404).json({ message: 'User not found.' })
      client.close()
      return
    }

    const currentPassword = user.password

    const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword)

    if (!passwordsAreEqual) {
      res.status(403).json({ message: 'Invalid old password.' })
      client.close()
      return
    }

    const hashedNewPassword = await hashPassword(newPassword)

    const result = await usersCollection.updateOne(
      { email: userEmail },
      { $set: { password: hashedNewPassword } }
    )

    client.close()
    res.status(200).json({ message: 'Password changed successfully.' })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

export default handler
