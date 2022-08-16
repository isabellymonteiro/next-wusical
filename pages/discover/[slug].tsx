import type { NextPage } from 'next'
import Head from 'next/head'

const Discover: NextPage = () => {
  return (
    <div>
      Album Page
      {/* <Head>
        <title>Wusical</title>
        <meta name="description" content="Women in Music" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      Spotify (example)
      <iframe
        style={{ borderRadius: '12px' }}
        src='https://open.spotify.com/embed/album/79thwyFL6Uo6rgTp3YWEAf?utm_source=generator'
        width='100%'
        height='380'
        frameBorder='0'
        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
      ></iframe>
    </div>
  )
}

export default Discover
