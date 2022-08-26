import type { NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { GetServerSideProps } from 'next'
import { authOptions } from './api/auth/[...nextauth]'
import LoginForm from '@components/organisms/Auth/LoginForm'

const Login: NextPage = () => {
  return (
    <div>
      <LoginForm />
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

export default Login
