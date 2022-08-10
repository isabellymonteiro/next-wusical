import type { NextPage } from 'next'
import Head from 'next/head'
import LoginForm from '@components/organisms/Auth/LoginForm'

const Login: NextPage = () => {
  return (
    <div>
      {/* <Head>
        <title>Wusical</title>
        <meta name="description" content="Women in Music" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <LoginForm />
    </div>
  )
}

export default Login
