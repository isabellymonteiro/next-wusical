import type { NextPage } from 'next'
import Head from 'next/head'
import ChangePasswordForm from '@organisms/Auth/ChangePasswordForm'

const ChangePassword: NextPage = () => {
  return (
    <div>
      <Head>
          <title>Change Password</title>
      </Head>
      <ChangePasswordForm />
    </div>
  )
}

export default ChangePassword