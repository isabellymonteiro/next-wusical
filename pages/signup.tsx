import type { NextPage } from 'next'
import Head from 'next/head'
import SignUpForm from '@organisms/Auth/SignUpForm'

const SignUp: NextPage = () => {
  return (
    <div>
      {/* <Head>
        <title>Wusical</title>
        <meta name="description" content="Women in Music" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <SignUpForm />
    </div>
  )
}

export default SignUp
