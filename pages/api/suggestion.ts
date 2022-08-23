import { connectToUsersDatabase } from '@helpers/db'
import type { NextApiRequest, NextApiResponse } from 'next'
 
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return
  }
 
  try {
    const { userEmail, message } = req.body

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
    console.log(result)
   
    res.status(201).send({ message: 'Message sent successfully. Thanks!' })
    client.close()
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}
 
export default handler