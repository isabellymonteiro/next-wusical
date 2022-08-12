import type { NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { GetServerSideProps } from 'next'
import { authOptions } from './api/auth/[...nextauth]'
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {},
  }
}

export default SignUp
