import type { InferGetStaticPropsType, NextPage } from 'next'
import { useState } from 'react'
import { GetStaticProps } from 'next'
import { connectToAlbumsDatabase } from '@helpers/db'
import AlbumList from '@organisms/AlbumList'
import PageTitle from '@atoms/PageTitle'
import Searchbar from '@molecules/Searchbar'

type Album = {
  _id: string,
  artist: string,
  name: string,
  image: string,
  releaseYear: string,
  language: string,
  genre: string[],
  spotify: string
}

const Discover: NextPage = ({ albums }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [filteredAlbums, setFilteredAlbums] = useState<Album[] | null>(albums)
  
  const handleSearch = (searchTerm: string) => {
    if (searchTerm === '') {
      return
    } else {
      const filteredData = albums.filter((album: Album) =>
        album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.artist.toLowerCase().includes(searchTerm.toLowerCase())
      )
      if (filteredData.length === 0) {
        setFilteredAlbums(null)
        return
      }
      setFilteredAlbums(filteredData)
    }
  }

  return (
    <div>
      <PageTitle title='Discover' />
      <Searchbar handleSearch={handleSearch} />
      <AlbumList albums={filteredAlbums} />
    </div>
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