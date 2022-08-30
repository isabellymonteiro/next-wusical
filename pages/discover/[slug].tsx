import type { InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { connectToAlbumsDatabase } from '@helpers/db'
import { ObjectId } from 'mongodb'
import AlbumDetailed from '@organisms/AlbumDetailed'

const Album: NextPage = ({ 
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
    <div style={{ maxWidth: '800px', marginBottom: '40px' }}>
      <Head>
          <title>{name}</title>
      </Head>
      <AlbumDetailed 
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

  const client = await connectToAlbumsDatabase()
  const db = client.db()
  const id = new ObjectId(albumId!)

  const response = await db.collection('albums').findOne({ _id: id })
  const album = JSON.parse(JSON.stringify(response))
  client.close()

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

export default Album