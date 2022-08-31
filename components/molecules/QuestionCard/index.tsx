import { useState, useEffect } from 'react'
import type { Answer } from '@organisms/QuizWrapper'
import AnswerButton from '@atoms/AnswerButton'
import HintButton from '@atoms/HintButton'

import classes from './styles.module.scss'

type Question = {
  id: string,
  description: string,
  hint: string,
  answers: string[],
  correct_answer: string,
}

type Props = {
  question: Question,
  callback: (answer: string) => void,
  userAnswer: Answer | undefined,
  questionNumber: number
  totalQuestions: number
}

const QuestionCard = ({
  question,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions
}: Props) => {
  const [showHint, setShowHint] = useState<boolean>(false)

  const toggleHint = () => {
    setShowHint(prev => !prev)
  }

  useEffect(() => {
    setShowHint(false)
  }, [question])

  const options = question.answers.map((answer) => {
    return (
      <li className={classes.questionCard__option} key={answer}>
        <AnswerButton
          answer={answer}
          isCorrect={userAnswer?.correctAnswer === answer}
          clicked={userAnswer?.answer === answer}
          disabled={!!userAnswer}
          handleClick={() => callback(answer)}
        />
      </li>
    )
  })
  return (
    <li className={classes.questionCard}>
      <p className={classes.questionCard__number}>Question: {questionNumber} / {totalQuestions}</p>
      <p className={classes.questionCard__description}>{question.description}</p>
      <div className={classes.questionCard__hint}>
        {showHint && <p className={classes.questionCard__hintText}>{question.hint}</p>}
        <HintButton showHint={showHint} handleOnClick={toggleHint} />
      </div>
      <ul className={classes.questionCard__optionList}>
        {options}
      </ul>
    </li>
  )
}

export default QuestionCard