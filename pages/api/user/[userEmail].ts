import { connectToUsersDatabase } from '@helpers/db'
import type { NextApiRequest, NextApiResponse } from 'next'
 
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return
  }
 
  try {
    const { userEmail } = req.query

    const client = await connectToUsersDatabase()
    const db = client.db()

    const userData = await db.collection('users').findOne({email: userEmail})

    res.status(200).json({ user: userData })
    client.close()
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}
 
export default handler