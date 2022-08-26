import { connectToQuestionsDatabase } from '@helpers/db'
import type { NextApiRequest, NextApiResponse } from 'next'
 
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return
  }
 
  try {
    const { total } = req.query

    const client = await connectToQuestionsDatabase()
    const db = client.db()
    const totalQuestions = parseInt(total as string)

    const questions = await db.collection('questions').aggregate([{ $sample: { size: totalQuestions } }]).toArray()

    res.status(200).json({ questions: questions })
    client.close()
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}
 
export default handler