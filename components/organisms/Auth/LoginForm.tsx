import { FormEvent, useRef, useState } from 'react'
import Link from 'next/link'
import Input from '@molecules/Input'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Github from '@atoms/icons/Github'
import FeedbackMessage, {
  FeedbackMessageProps,
  MessageStatus,
} from '@atoms/FeedbackMessage'
import GithubButton from '@atoms/GithubButton'

import classes from './styles.module.scss'

const LoginForm = () => {
  const [feedbackMessage, setFeedbackMessage] = useState<FeedbackMessageProps | null>(null)

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = await signIn('credentials', {
      redirect: false,
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value
    })

    if (result?.error) {
      setFeedbackMessage({ 
        text: 'Incorrect username or password',
        status: MessageStatus.ERROR
      })
    } else {
      router.replace('/')
    }
  }

  return (
    <section className={classes.authForm__container}>
      <h1 className={classes.authForm__title}>LOG IN</h1>
      {feedbackMessage && 
        <FeedbackMessage 
          text={feedbackMessage.text} 
          status={feedbackMessage.status} 
        />
      }
      <form className={classes.authForm} onSubmit={submit} noValidate>
        <div className={classes.authForm__inputContainer}>
          <Input
            labelText='Email'
            id='email'
            type='email'
            placeholder='Enter your email'
            name='email'
            refProp={emailRef}
            inputError={''}
          />
        </div>
        <div className={classes.authForm__inputContainer}>
          <Input
            labelText='Password'
            id='password'
            type='password'
            placeholder='Enter your password'
            name='password'
            refProp={passwordRef}
            inputError={''}
            showPassword
          />
        </div>
        <button className={classes.authForm__button} type='submit'>
          Log in
        </button>
      </form>
      <GithubButton text='Log in with Github' />
      <p className={classes.authForm__paragraph}>
        Need an account?{' '}
        <Link href='/signup'>
          <a className={classes.authForm__link}>Sign up</a>
        </Link>
      </p>
    </section>
  )
}

export default LoginForm
