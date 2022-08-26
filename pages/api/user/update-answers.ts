import { connectToUsersDatabase } from '@helpers/db'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import type { NextApiRequest, NextApiResponse } from 'next'
 
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return
  }
 
  try {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      res.status(401).json({ message: 'You must be logged in.' })
      return
    }

    const userEmail = session?.user?.email
    const { correctAnswers, totalAnswers } = req.body

    const correctAnswersNumber = parseInt(correctAnswers)
    const totalAnswersNumber = parseInt(totalAnswers)
    
    const client = await connectToUsersDatabase()
    const db = client.db()
 
    await db.collection('users').updateOne(
      { email: userEmail },
      { $inc: { correctAnswers: correctAnswersNumber, totalAnswers: totalAnswersNumber } }
    )
   
    res.status(204).end()
    client.close()
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}
 
export default handler