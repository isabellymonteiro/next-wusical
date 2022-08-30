import type { NextPage } from 'next'
import { useState } from 'react'
import { unstable_getServerSession } from 'next-auth/next'
import { GetServerSideProps } from 'next'
import { authOptions } from './api/auth/[...nextauth]'
import LoginForm from '@components/organisms/Auth/LoginForm'
import SignUpForm from '@organisms/Auth/SignUpForm'

import classes from '../styles/home.module.scss'

const Home: NextPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true)

  const toggleLogin = () => {
    setIsLogin(prev => !prev)
  }

  return (
    <div>
      <div className={classes.home}>
        <div className={classes.home__wusical}>
          <h1 className={classes.home__title}>
            Wusical
            <span className={classes.home__subheading}>Women in Music</span>
          </h1>
          <p className={classes.home__description}>
            Take the quiz, discover and suggest
          </p>
        </div>
        {isLogin ? 
          <LoginForm toggleAuth={toggleLogin} /> : 
          <SignUpForm toggleAuth={toggleLogin} />
        }
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }

  return {
    props: {},
  }
}

export default Home
