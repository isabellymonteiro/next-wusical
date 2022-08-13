import Link from 'next/link'
import { useState } from 'react'
import useSignUp from '@hooks/useSignUp'
import { validateSignUp } from '@utils/validateSignUp'
import Input from '@molecules/Input'
import { createUser } from '@services/api'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import FeedbackMessage, {
  FeedbackMessageProps,
  MessageStatus,
} from '@atoms/FeedbackMessage'

import classes from './styles.module.scss'

const SignUpForm = () => {
  const [feedbackMessage, setFeedbackMessage] = useState<FeedbackMessageProps | null>(null)

  const router = useRouter()

  const submit = async () => {
    const data = await createUser(signUpData.email, signUpData.password)
    if (data.error) {
      setFeedbackMessage({ 
        text: data.error,
        status: MessageStatus.ERROR
      })
    } else {
      const result = await signIn('credentials', {
        redirect: false,
        email: signUpData.email,
        password: signUpData.password
      })

      if (result?.error) {
        setFeedbackMessage({ 
          text: 'Account created but something went wrong authenticating. Try logging in!',
          status: MessageStatus.ERROR
        })
      } else {
        router.replace('/')
      }
    }
  }

  const { signUpData, signUpDataErrors, handleChange, handleSubmit } =
    useSignUp(submit, validateSignUp)

  return (
    <section>
      <h1 className={classes.authForm__title}>SIGN UP</h1>
      {feedbackMessage && 
        <FeedbackMessage 
          text={feedbackMessage.text} 
          status={feedbackMessage.status} 
        />
      }
      <form className={classes.authForm} onSubmit={handleSubmit} noValidate>
        <div className={classes.authForm__inputContainer}>
          <Input
            labelText="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={signUpData.email}
            handleOnChange={handleChange}
            inputError={signUpDataErrors.emailError}
          />
          {signUpDataErrors.emailError && (
            <span className={classes.authForm__validation}>
              {signUpDataErrors.emailError}
            </span>
          )}
        </div>
        <div className={classes.authForm__inputContainer}>
          <Input
            labelText="Password"
            id="password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={signUpData.password}
            handleOnChange={handleChange}
            inputError={signUpDataErrors.passwordError}
            showPassword
          />
          {signUpDataErrors.passwordError && (
            <span className={classes.signUpForm__validation}>
              {signUpDataErrors.passwordError}
            </span>
          )}
        </div>
        <button className={classes.authForm__button} type='submit'>
          Sign Up
        </button>
      </form>
      <p className={classes.authForm__paragraph}>
        Already a user?{' '}
        <Link href="/login">
          <a className={classes.authForm__link}>SIGN UP</a>
        </Link>
      </p>
    </section>
  )
}

export default SignUpForm
