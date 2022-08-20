import type { InferGetStaticPropsType, NextPage } from 'next'
import { GetStaticProps } from 'next'
import { connectToAlbumsDatabase } from '@helpers/db'
import AlbumList from '@organisms/AlbumList'
import PageTitle from '@atoms/PageTitle'

const Favorites: NextPage = ({ albums }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <PageTitle title='My favorites' />
      <AlbumList albums={albums} onlyFavorites />
    </>
  )
}
 
export const getStaticProps: GetStaticProps = async () => {
  const client = await connectToAlbumsDatabase()
  const db = client.db()

  const response = await db.collection('albums').find({}).toArray()
  const albums = JSON.parse(JSON.stringify(response))

  client.close()

  return {
    props: {
      albums: albums
    }
  }
}
 
export default Favorites