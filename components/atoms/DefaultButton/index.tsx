import classes from './styles.module.scss'

type DefaultButtonProps = {
  text: string,
  type: 'submit' | 'reset' | 'button',
  handleOnClick?: () => void,
  fullWidth?: boolean
}

const DefaultButton = ({ text, type, handleOnClick, fullWidth }: DefaultButtonProps) => {
  return (
    <button className={`${classes.defaultButton} ${fullWidth ? classes['defaultButton--fullWidth'] : ''}`} type={type} onClick={handleOnClick}>
      {text}
    </button>
  )
}

export default DefaultButton