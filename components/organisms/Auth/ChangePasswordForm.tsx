import { FormEvent, useRef, useState } from 'react'
import Input from '@molecules/Input'
import { changePassword } from '@services/api'
import FeedbackMessage, {
  FeedbackMessageProps,
  MessageStatus,
} from '@atoms/FeedbackMessage'

import classes from './styles.module.scss'

const ChangePasswordForm = () => {
  const [feedbackMessage, setFeedbackMessage] = useState<FeedbackMessageProps | null>(null)

  const oldPasswordRef = useRef<HTMLInputElement>(null)
  const newPasswordRef = useRef<HTMLInputElement>(null)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const enteredOldPassword = oldPasswordRef?.current?.value
    const enteredNewPassword = newPasswordRef?.current?.value

    if (
      !enteredOldPassword ||
      enteredOldPassword.trim() === '' ||
      !enteredNewPassword ||
      enteredNewPassword.trim() === ''
    ) {
      setFeedbackMessage({ 
        text: 'Please type both passwords.',
        status: MessageStatus.ERROR
      })
      return
    } else if (
      enteredNewPassword.length < 8 ||
      !/[0-9]/g.test(enteredNewPassword)
    ) {
      setFeedbackMessage({ 
        text: 'Your new password must be at least 8 characters long and contain at least one number.',
        status: MessageStatus.ERROR
      })
      return
    }

    const data = await changePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    })

    if (data.error) {
      setFeedbackMessage({ 
        text: data.error,
        status: MessageStatus.ERROR
      })
    } else {
      setFeedbackMessage({ 
        text: data.message,
        status: MessageStatus.SUCCESS
      })
    }
  }

  return (
    <section className={classes.authForm__container}>
      <h1 className={classes.authForm__title}>Change Password</h1>
      {feedbackMessage &&
        <FeedbackMessage
          text={feedbackMessage.text}
          status={feedbackMessage.status}
        />
      }
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
        </div>
        <button className={classes.authForm__button} type='submit'>
          Change Password
        </button>
      </form>
    </section>
  )
}

export default ChangePasswordForm
