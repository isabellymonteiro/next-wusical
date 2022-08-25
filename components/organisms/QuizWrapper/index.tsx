import { useState } from 'react'
import { TOTAL_QUESTIONS } from '@pages/quiz'
import QuestionCard from '@molecules/QuestionCard'

import classes from './styles.module.scss'

export type Answer = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

type Question = {
  id: string,
  description: string,
  hint: string,
  answers: string[],
  correct_answer: string
}

type Questions = {
  questions: Question[]
}

const QuizWrapper = ({ questions }: Questions) => {
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [userAnswers, setUserAnswers] = useState<Answer[]>([])
  const [score, setScore] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(true)
  const [showFinalScore, setShowFinalScore] = useState<boolean>(false)

  // fazer hook para fetch das questions

  const startTrivia = async() => {
    setGameOver(false)
    setScore(0)
    setUserAnswers([])
    setQuestionNumber(0)
  }

  const checkAnswer = (answer: string) => {
    if (!gameOver) {
      const correct = questions[questionNumber].correct_answer === answer
      if (correct) setScore(prev => prev + 1)

      const answerObject = {
        question: questions[questionNumber].description,
        answer,
        correct,
        correctAnswer: questions[questionNumber].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = questionNumber + 1
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
      setShowFinalScore(true)
    } else {
      setQuestionNumber(nextQuestion)
    }
  }

  const playAgain = () => {
    setShowFinalScore(false)
  }

  return (
    <>
      {showFinalScore &&
        <div>
          <p className='finalScore'>FINAL SCORE: {score} / {TOTAL_QUESTIONS}</p>
          <button onClick={playAgain}>Play again</button>
        </div>
      }
      {gameOver && !showFinalScore &&
        <button onClick={startTrivia}>
          <img src='/* {StartIcon} */' alt='Start trivia'></img>
          START
        </button>
      }
      {!gameOver && <p className='score'>SCORE: {score}</p>}
      {!gameOver &&
        <QuestionCard
          question={questions[questionNumber]}
          callback={checkAnswer}
          userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
          questionNumber={questionNumber + 1}
          totalQuestions={TOTAL_QUESTIONS}
        />
      }
      {!gameOver && userAnswers.length === questionNumber + 1 &&
        <button onClick={nextQuestion}>
          {userAnswers.length === TOTAL_QUESTIONS ? 'SEE RESULT' : 'NEXT QUESTION'}
          <img className='next' src='/* {NextIcon} */' alt='Next' />
        </button>
      }
    </>
  )
}

export default QuizWrapper
