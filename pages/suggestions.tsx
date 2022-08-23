import type { NextPage } from 'next'
import PageTitle from '@atoms/PageTitle'
import SuggestMessage from '@organisms/SuggestMessage'

const Suggestions: NextPage = () => {
  return (
    <div style={{ maxWidth: '600px' }}>
      <PageTitle title='Suggest' />
      <SuggestMessage />
    </div>
  )
}

export default Suggestions