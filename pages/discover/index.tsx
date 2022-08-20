import type { InferGetStaticPropsType, NextPage } from 'next'
import { GetStaticProps } from 'next'
import { connectToAlbumsDatabase } from '@helpers/db'
import { useSession } from 'next-auth/react'
import AlbumList from '@organisms/AlbumList'
import PageTitle from '@atoms/PageTitle'

const Discover: NextPage = ({ albums }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <PageTitle title='Discover' />
      <AlbumList albums={albums} />
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
 
export default Discover
