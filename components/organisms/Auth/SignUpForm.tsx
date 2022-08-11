import Link from 'next/link'
import useSignUp from '@hooks/useSignUp'
import { validateSignUp } from '@utils/validateSignUp'
import Input from '@molecules/Input'
import { createUser } from '@services/api'

import classes from './styles.module.scss'

const SignUpForm = () => {
  const submit = async () => {
    try {
      const result = await createUser(signUpData.email, signUpData.password)
      console.log(result)
    } catch (e: any) {
      console.log(e.message)
    }  
  }

  const { signUpData, signUpDataErrors, handleChange, handleSubmit } =
    useSignUp(submit, validateSignUp)

  return (
    <section>
      <h1 className={classes.authForm__title}>SIGN UP</h1>
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
        <button className={classes.authForm__button} type="submit">
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
