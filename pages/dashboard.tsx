import type { NextPage } from 'next'
import useUserData from '@hooks/useUserData'
import LoadingSpinner from '@atoms/icons/LoadingSpinner'
import Error from '@molecules/Error'
import PageTitle from '@atoms/PageTitle'
import AnswersStats from '@molecules/AnswersStats'

import classes from '../styles/dashboard.module.scss'

const Dashboard: NextPage = () => {
  const { userData, error, loading } = useUserData()

  return (
    <>
      <PageTitle title='My dashboard' />
      {error && <Error />}
      {loading && !error &&
        <div className={classes.dashboard__loading}><LoadingSpinner /></div>
      }
      {userData && !loading && (
        <>
          <AnswersStats correctAnswers={userData.correctAnswers} totalAnswers={userData.totalAnswers} />
        </>
      )}
    </>
  )
}
 
export default Dashboard