import type { NextPage } from 'next'
import ChangePasswordForm from '@components/organisms/Auth/ChangePasswordForm'
import Head from 'next/head'

const ChangePassword: NextPage = () => {
  return (
    <div>
      {/* <Head>
        <title>Wusical</title>
        <meta name="description" content="Women in Music" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <ChangePasswordForm />
    </div>
  )
}

export default ChangePassword