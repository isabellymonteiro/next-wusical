export {}
// not being user - logic is done with directly in getServerSideProps
/* import { connectToAlbumsDatabase } from '@helpers/db'
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
 
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return
  }
 
  try {
    const { albumId } = req.query

    const client = await connectToAlbumsDatabase()
    const db = client.db()
    const id = new ObjectId(albumId as string)

    const album = await db.collection('albums').findOne({ _id: id })

    res.status(200).json({ album: album })
    client.close()
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}
 
export default handler */