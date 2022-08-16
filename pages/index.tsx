import type { NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { GetServerSideProps } from 'next'
import { authOptions } from './api/auth/[...nextauth]'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Wusical</title>
        <meta name="description" content="Women in Music" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Homepage
      <div>la</div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)) 
      // JSON methods needed due to serializing error when passing just session.
      // but it may be causing "unhandledRejection: Error: aborted" ?
    }
  }
}

export default Home
