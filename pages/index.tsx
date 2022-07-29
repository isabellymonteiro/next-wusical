import type { NextPage } from 'next'
import Head from 'next/head'
import HelloWorld from '../components/atoms/HelloWorld'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Wusical</title>
        <meta name="description" content="Women in Music" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HelloWorld />
    </div>
  )
}

export default Home
