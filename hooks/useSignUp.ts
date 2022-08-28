import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { signUpData } from '@utils/validateSignUp'

type Error = {
  emailError: string,
  passwordError: string
}

const useSignUp = (
  callback: () => void,
  validate: (signUpData: signUpData) => Error
) => {
  
  const initialSignUpData = {
    email: ``,
    password: ``,
  }

  const [signUpData, setSignUpData] = useState(initialSignUpData)

  const [signUpDataErrors, setSignUpDataErrors] = useState({
    emailError: ``,
    passwordError: ``,
  })

  const [isSubmiting, setIsSubmiting] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setSignUpData((prevState) => {
      return {
        ...prevState,
        [name]: value, // [name] -> pass whatever name value as key
      }
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSignUpDataErrors(validate(signUpData))
    setIsSubmiting(true)
  }

  useEffect(() => {
    if (signUpDataErrors.emailError === '' && signUpDataErrors.passwordError === '' && isSubmiting) {
      callback()
      setSignUpData(initialSignUpData)
    }
  }, [signUpDataErrors])

  return {
    signUpData,
    signUpDataErrors,
    handleChange,
    handleSubmit,
  }
}

export default useSignUp
