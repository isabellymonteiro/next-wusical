import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import LoadingSpinner from '@atoms/icons/LoadingSpinner'
import Head from 'next/head'

const Quiz: NextPage = () => {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      {/* <Head>
        <title>Wusical</title>
        <meta name="description" content="Women in Music" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      Quiz Page
    </div>
  )
}

export default Quiz