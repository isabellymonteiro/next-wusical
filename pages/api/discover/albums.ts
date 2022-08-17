import { connectToAlbumsDatabase } from '@helpers/db'
import type { NextApiRequest, NextApiResponse } from 'next'
 
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return
  }
 
  try {
    const client = await connectToAlbumsDatabase()
    const db = client.db()
 
    const albums = await db.collection('albums').find({}).toArray()
   
    res.status(200).json({albums: albums})
    client.close()
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}
 
export default handler