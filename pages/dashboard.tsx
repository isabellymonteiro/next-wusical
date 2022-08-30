import type { InferGetStaticPropsType, NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { connectToAlbumsDatabase } from '@helpers/db'
import useUserData from '@hooks/useUserData'
import LoadingSpinner from '@atoms/icons/LoadingSpinner'
import Error from '@molecules/Error'
import PageTitle from '@atoms/PageTitle'
import AnswersStats from '@molecules/AnswersStats'
import AlbumList from '@organisms/AlbumList'
import Subheading from '@atoms/Subheading'

const Dashboard: NextPage = ({
  albums,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { userData, error, loading } = useUserData()

  return (
    <div>
      <Head>
          <title>Dashboard</title>
      </Head>
      <PageTitle title='My dashboard' />
      {error && <Error />}
      {loading && !error && (
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            minHeight: '20vh',
          }}
        >
          <LoadingSpinner />
        </div>
      )}
      {userData && !loading && (
        <>
          <Subheading title='Quiz stats' />
          <AnswersStats
            correctAnswers={userData.correctAnswers}
            totalAnswers={userData.totalAnswers}
          />
          <Subheading title='Favorites' />
          <AlbumList albums={albums} onlyFavorites />
        </>
      )}
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
      albums: albums,
    },
  }
}

export default Dashboard
