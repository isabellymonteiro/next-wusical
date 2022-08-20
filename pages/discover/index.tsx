import type { InferGetStaticPropsType, NextPage } from 'next'
import { GetStaticProps } from 'next'
import { server } from '@config/index'
import { useSession } from "next-auth/react"
import AlbumList from '@organisms/AlbumList'
import PageTitle from '@atoms/PageTitle'
 
export type Album = {
  _id: string,
  artist: string,
  name: string,
  image: string,
  releaseYear: string,
  language: string,
  genre: string[],
  spotify: string
}

const Discover: NextPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: session } = useSession()

  return (
    <>
      <PageTitle title='Discover' />
      <AlbumList albums={data.albums} userEmail={session?.user?.email!} />
    </>
  )
}
 
export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${server}/api/discover/albums`)
  const data = await response.json()

  return {
    props: {
      data: data
    }
  }
}
 
export default Discover
