import classes from './styles.module.scss'

type DefaultButtonProps = {
  text: string,
  type: 'submit' | 'reset' | 'button',
  handleOnClick?: () => void
}

const DefaultButton = ({ text, type, handleOnClick }: DefaultButtonProps) => {
  return (
    <button className={classes.defaultButton} type={type} onClick={handleOnClick}>
      {text}
    </button>
  )
}

export default DefaultButton