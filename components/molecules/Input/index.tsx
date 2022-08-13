import { ChangeEvent, LegacyRef, useState } from 'react'
import Eye from '@atoms/icons/Eye'
import EyeBlocked from '@atoms/icons/EyeBlocked'

import './styles.module.scss'

type Props = {
  labelText: string,
  id: string,
  type: string, 
  placeholder: string, 
  name: string, 
  value?: string,
  refProp?: LegacyRef<HTMLInputElement> | undefined,
  handleOnChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  inputError?: string,
  showPassword?: boolean
}

const Input = ({ 
  labelText, 
  id,
  type, 
  placeholder, 
  name, 
  value, 
  handleOnChange,
  refProp,
  inputError,
  showPassword
}: Props) => {
  const [isShowingPassword, setIsShowingPassword] = useState(false)

  return (
    <>
      <label htmlFor={id} className={`input__label'}`}>{labelText}</label>
      <div className='input__container'>
        <input className={`input ${inputError ? 'input--error' : ''}`}
          id={id} 
          type={isShowingPassword ? 'text' : type}
          placeholder={placeholder} 
          name={name} 
          value={value}
          onChange={handleOnChange}
          ref={refProp}
        />
      {showPassword && 
        <button type='button' onClick={() => setIsShowingPassword((prevState) => !prevState)}>
          {isShowingPassword ? <Eye /> : <EyeBlocked />}
        </button>
      }
      </div>
    </>
  )
}
 
export default Input