export type signUpData = {
  email: string,
  password: string
}

export const validateSignUp = ({ email, password }: signUpData) => {

  let errors = { emailError: ``, passwordError: `` }
  
  const emailTrimmed = email.trim()
  const passwordTrimmed = password.trim()

  if (!email || emailTrimmed === '') {
    errors.emailError = 'Please, type your email.'
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    errors.emailError = 'Please type a valid email.'
  }
  if (!password || passwordTrimmed === '') {
    errors.passwordError = 'Please, type your password.'
  } else if (passwordTrimmed.length < 8 || !/[0-9]/g.test(password)) {
    errors.passwordError = 'Your password must be at least 8 characters long and contain at least one number.'
  }

  return errors
}