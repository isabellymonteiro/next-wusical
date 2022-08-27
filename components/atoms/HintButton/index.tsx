import LightBulbIcon from '@atoms/icons/LightBulb'

import classes from './styles.module.scss'

type ButtonProps = {
  showHint: boolean
  handleOnClick: () => void
}

const GithubButton = ({ showHint, handleOnClick }: ButtonProps) => {
  return (
    <button 
      type='button'
      onClick={handleOnClick}
      className={classes.hintButton}
      aria-label={showHint ? 'hide hint' : 'show hint'}
    >
      <LightBulbIcon />
    </button>
  )
}

export default GithubButton