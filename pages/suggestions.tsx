import type { NextPage } from 'next'
import Head from 'next/head'
import PageTitle from '@atoms/PageTitle'
import SuggestMessage from '@organisms/SuggestMessage'

const Suggestions: NextPage = () => {
  return (
    <div style={{ maxWidth: '600px' }}>
      <Head>
          <title>Suggestions</title>
      </Head>
      <PageTitle title='Suggest' />
      <SuggestMessage />
    </div>
  )
}

export default Suggestions