import classes from './styles.module.scss'

type Props = {
  answer: string,
  isCorrect: boolean,
  clicked: boolean,
  disabled: boolean,
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const AnswerButton = ({
  answer,
  isCorrect,
  clicked,
  disabled,
  handleClick
}: Props) => {

  return (
    <button disabled={disabled} onClick={handleClick}>
      {answer}
    </button>
  )
}

export default AnswerButton