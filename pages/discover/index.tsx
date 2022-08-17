import type { InferGetStaticPropsType, NextPage } from 'next'
import { GetStaticProps } from 'next'
 
type Album = {
  id: string,
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
    <div>
      Discover Page
    </div>
  )
}
 
export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:3000/api/discover/albums')
  const data: AlbumsData = await response.json()
 
  return {
    props: {
      data: data
    }
  }
}
 
export default Discover
