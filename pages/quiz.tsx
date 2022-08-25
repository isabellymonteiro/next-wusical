import type { NextPage,InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import { shuffleArray } from '@utils/shuffleArray'
import QuizWrapper from '@organisms/QuizWrapper'

type AllQuestionData = {
  translations: { en: {
    description: string,
    hint: string
  }},
  _id: string,
  description: string,
  incorrect_answers: string[],
  correct_answer: string,
  hint: string
}

export const TOTAL_QUESTIONS = 5

const Quiz: NextPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <QuizWrapper questions={data} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  
  const response = await fetch(`https://wusical-questions-api.herokuapp.com/questions/amount/${TOTAL_QUESTIONS}`)
  
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  const transformedData = data.map((question: AllQuestionData) => {
    const answers = shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer
    ])

    return (
      {
        id: question._id,
        description: question.translations.en.description,
        hint: question.translations.en.hint,
        answers: answers,
        correct_answer: question.correct_answer
      }
    )
  })

  return {
    props: {
      data: JSON.parse(JSON.stringify(transformedData))
    }
  }
}

export default Quiz