import Head from 'next/head'
import type { NextPage } from 'next'
import QuizWrapper from '@organisms/QuizWrapper'

const Quiz: NextPage = () => {
  return (
    <div>
      <Head>
          <title>Quiz</title>
      </Head>
      <QuizWrapper />
    </div>
  )
}

export default Quiz