import { useState } from 'react'
import QuestionCard from '@molecules/QuestionCard'
import Error from '@molecules/Error'
import LoadingSpinner from '@atoms/icons/LoadingSpinner'
import DefaultButton from '@atoms/DefaultButton'
import { getQuestions, updateUserAnswers } from '@services/api'

import classes from './styles.module.scss'

const TOTAL_QUESTIONS = 5

export type Answer = {
  answer: string
  correctAnswer: string
}

type Question = {
  id: string,
  description: string,
  hint: string,
  answers: string[],
  correct_answer: string
}

const QuizWrapper = () => {
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [userAnswers, setUserAnswers] = useState<Answer[]>([])
  const [score, setScore] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(true)
  const [showFinalScore, setShowFinalScore] = useState<boolean>(false)

  const fetchQuestions = async () => {
    setLoading(true)
    const data = await getQuestions(TOTAL_QUESTIONS)
    if (data.error) {
      setError(true)
    } else {
      setQuestions(data)
    }
    setLoading(false)
  }

  const startTrivia = async() => {
    fetchQuestions()
    setGameOver(false)
    setScore(0)
    setUserAnswers([])
    setQuestionNumber(0)
  }

  const checkAnswer = (answer: string) => {
    if (!gameOver) {
      const isCorrect = questions[questionNumber].correct_answer === answer

      if (isCorrect) setScore(prev => prev + 1)

      const answerObject = {
        answer,
        correctAnswer: questions[questionNumber].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObject])
    }
  }

  const nextQuestion = async () => {
    const nextQuestion = questionNumber + 1
    if (nextQuestion === TOTAL_QUESTIONS) {
      await updateUserAnswers(score, TOTAL_QUESTIONS)
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
      {error ? <Error /> :
        <div>
          {loading && <LoadingSpinner />}
          {showFinalScore &&
            <div>
              <p className='finalScore'>FINAL SCORE: {score} / {TOTAL_QUESTIONS}</p>
              <DefaultButton text='Play again' type='button' handleOnClick={playAgain} />
            </div>
          }
          {!loading && gameOver && !showFinalScore &&
            <DefaultButton text='Start quiz' type='button' handleOnClick={startTrivia} />
          }
          {!loading && !gameOver &&
            <QuestionCard
              question={questions[questionNumber]}
              callback={checkAnswer}
              userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
              questionNumber={questionNumber + 1}
              totalQuestions={TOTAL_QUESTIONS}
            />
          }
          {!gameOver && !loading && userAnswers.length === questionNumber + 1 &&
            <DefaultButton 
              text={userAnswers.length === TOTAL_QUESTIONS ? 'See result' : 'Next question'}
              type='button' 
              handleOnClick={nextQuestion} 
            />
          }
        </div>
      }
    </>
  )
}

export default QuizWrapper