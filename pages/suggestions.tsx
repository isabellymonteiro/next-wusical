import type { NextPage } from 'next'
import PageTitle from '@atoms/PageTitle'
import SuggestMessage from '@organisms/SuggestMessage'

const Suggestions: NextPage = () => {
  return (
    <div>
      <PageTitle title='Suggest' />
      <p>Suggest questions, artists, albums or any new feature you would like to see on this app.</p>
      <SuggestMessage />
    </div>
  )
}

export default Suggestions