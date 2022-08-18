import type { InferGetStaticPropsType, NextPage } from 'next'
import { GetStaticProps } from 'next'
import { server } from '@config/index'
import AlbumCard from '@molecules/AlbumCard'
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

type AlbumsData = {
  albums: Album[]
}

const Discover: NextPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <PageTitle title='Discover' />
      <ul>
        {data.albums.map((album: Album) => {
          return (
            <AlbumCard 
              key={album._id}
              _id={album._id}
              artist={album.artist}
              name={album.name}
              image={album.image}
              releaseYear={album.releaseYear}
              language={album.language}
              genre={album.genre}
              spotify={album.spotify}
            />
          )
        })}
      </ul>
    </>
  )
}
 
export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${server}/api/discover/albums`)
  const data: AlbumsData = await response.json()

  return {
    props: {
      data: data
    }
  }
}
 
export default Discover
