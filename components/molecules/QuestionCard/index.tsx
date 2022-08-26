import type { Answer } from '@organisms/QuizWrapper'
import AnswerButton from '@atoms/AnswerButton'

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

  const options = question.answers.map((answer) => {
    return (
      <li key={answer}>
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
    <li className={classes.albumCard}>
      <p>Question: {questionNumber} / {totalQuestions}</p>
      <p>{question.description}</p> 
      <ul>
        {options}
      </ul>
    </li>
  )
}

export default QuestionCard