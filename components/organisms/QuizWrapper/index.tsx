import { useState, useEffect } from 'react'
import QuestionCard from '@molecules/QuestionCard'
import Error from '@molecules/Error'
import LoadingSpinner from '@atoms/icons/LoadingSpinner'
import DefaultButton from '@atoms/DefaultButton'
import { getQuestions } from '@services/api'

import classes from './styles.module.scss'

const TOTAL_QUESTIONS = 5

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

const QuizWrapper = () => {
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [userAnswers, setUserAnswers] = useState<Answer[]>([])
  const [score, setScore] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(true)
  const [showFinalScore, setShowFinalScore] = useState<boolean>(false)

  useEffect(() => {
    fetchQuestions()
  }, [])

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
    fetchQuestions()
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
            <DefaultButton text='Start trivia' type='button' handleOnClick={startTrivia} />
          }
          {!gameOver && !loading && <p className='score'>SCORE: {score}</p>}
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