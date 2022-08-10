import { useState, useRef } from 'react'
import Link from 'next/link'
import Input from '@molecules/Input'

import classes from './styles.module.scss'

const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  // You have entered an invalid username or password
  const submit = () => {}

  return (
    <section>
      <h1 className={classes.authForm__title}>LOG IN</h1>
      <form className={classes.authForm} onSubmit={() => {}} noValidate>
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
          {/* {signUpDataErrors.emailError && (
            <span className='loginForm__validation'>
              {signUpDataErrors.emailError}
            </span>
          )} */}
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
          {/* {signUpDataErrors.passwordError && (
            <span className='loginForm__validation'>
              {signUpDataErrors.passwordError}
            </span>
          )} */}
        </div>
        <button className={classes.authForm__button} type='submit'>
          Log in
        </button>
      </form>
      <p className={classes.authForm__paragraph}>
        Need an account?{' '}
        <Link href='/signup'>
          <a className={classes.authForm__link}>SIGN UP</a>
        </Link>
      </p>
    </section>
  )
}

export default LoginForm