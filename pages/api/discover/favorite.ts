import { connectToUsersDatabase } from '@helpers/db'
import type { NextApiRequest, NextApiResponse } from 'next'
 
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return
  }
 
  try {
    const data = req.body
    const { userEmail, albumId } = data

    const client = await connectToUsersDatabase()
    const db = client.db()
 
    const hasAlbum = await db.collection('users').findOne(
      { email: userEmail, [`favorites.${albumId}`]: { $exists: true }}
    )

    if (hasAlbum) {
      const toggledFavorite = !hasAlbum?.favorites[albumId]
      const updatedDocument = await db.collection('users').updateOne(
        { email: userEmail },
        { $set: { [`favorites.${albumId}`]: toggledFavorite } }
      )
    } else {
      const updatedDocument = await db.collection('users').updateOne(
        { email: userEmail },
        { $set: { [`favorites.${albumId}`]: true } }
      )
    }
   
    res.status(204).end()
    client.close()
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}
 
export default handler