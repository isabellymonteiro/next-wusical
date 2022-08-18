import type { InferGetServerSidePropsType, NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { server } from '@config/index'
import AlbumDescription from '@organisms/AlbumDescription'

const AlbumDetailed: NextPage = ({ 
  id,
  artist,
  name,
  image,
  releaseYear,
  language,
  genre,
  spotify 
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  
  return (
    <div style={{ maxWidth: '800px' }}>
      <AlbumDescription 
        artist={artist}
        name={name}
        image={image}
        releaseYear={releaseYear}
        language={language}
        genre={genre}
      />
      <iframe
        aria-label={`${name} songs`}
        style={{ borderRadius: '10px', maxWidth: '800px' }}
        src={spotify}
        width='100%'
        height='380'
        frameBorder='0'
        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
      ></iframe>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // the user went to /discover first
  if (context.query.name) {
    return {
      props: {
        id: context.query._id,
        artist: context.query.artist,
        name: context.query.name,
        image: context.query.image,
        releaseYear: context.query.releaseYear,
        language: context.query.language,
        genre: context.query.genre,
        spotify: context.query.spotify
      }
    }
  }

  // the user entered this page directly (only slug available)
  const slug = context.query.slug
  const albumId = (slug as string).split('-').pop()

  const response = await fetch(`${server}/api/discover/${albumId}`)
  const data = await response.json()
  const album = data.album

   return {
      props: {
        id: album._id,
        artist: album.artist,
        name: album.name,
        image: album.image,
        releaseYear: album.releaseYear,
        language: album.language,
        genre: album.genre,
        spotify: album.spotify
      }
  } 
}

export default AlbumDetailed