import { connectToUsersDatabase } from '@helpers/db'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import type { NextApiRequest, NextApiResponse } from 'next'
 
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return
  }
 
  try {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      res.status(401).json({ message: 'You must be logged in.' })
      return
    }

    const userEmail = session?.user?.email
    const { message } = req.body

    if (!message || message.trim().length < 20) {
      res.status(422).json({ message: 'Your message should be at least 20 characters long.' })
      return
    }

    const client = await connectToUsersDatabase()
    const db = client.db()
 
    const result = await db.collection('messages').insertOne({
      userEmail: userEmail,
      message: message
    })
   
    res.status(201).send({ message: 'Message sent successfully. Thanks!' })
    client.close()
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}
 
export default handler