import { FormEvent, useRef, useState } from 'react'
import Input from '@molecules/Input'
import { changePassword } from '@services/api'

import classes from './styles.module.scss'

const ChangePasswordForm = () => {
  const [passwordError, setPasswordError] = useState<string>()

  const oldPasswordRef = useRef<HTMLInputElement>(null)
  const newPasswordRef = useRef<HTMLInputElement>(null)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const enteredOldPassword = oldPasswordRef?.current?.value
    const enteredNewPassword = newPasswordRef?.current?.value

    // TODO: ui ERROR feedback
    if (!enteredOldPassword || enteredOldPassword.trim() === '' || !enteredNewPassword || enteredNewPassword.trim() === '') {
      setPasswordError('Please, type both passwords.')
      return
    } else if (enteredNewPassword.length < 8 || !/[0-9]/g.test(enteredNewPassword)) {
      setPasswordError('Your new password must be at least 8 characters long and contain at least one number.')
      return
    }

    const data = await changePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword
    })

    if (data.error) {
       // TODO
      console.log(data.error)
    } else {
      console.log(data.message)
      // TODO: toast mostrando que mudou senha com sucesso
    }
  }

  return (
    <section>
      <h1 className={classes.authForm__title}>Change Password</h1>
      <form className={classes.authForm} onSubmit={submit} noValidate>
        <div className={classes.authForm__inputContainer}>
          <Input
            labelText='Old password'
            id='oldPassword'
            type='password'
            placeholder='Enter your old password'
            name='oldPassword'
            refProp={oldPasswordRef}
            inputError={''}
            showPassword
          />
          {/* {signUpDataErrors.emailError && (
            <span className='loginForm__validation'>
              {signUpDataErrors.emailError}
            </span>
          )} */}
        </div>
        <div className={classes.authForm__inputContainer}>
          <Input
            labelText='New password'
            id='newPassword'
            type='password'
            placeholder='Enter your new password'
            name='newPassword'
            refProp={newPasswordRef}
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
          Change Password
        </button>
      </form>
    </section>
  )
}

export default ChangePasswordForm
