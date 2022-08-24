import type { NextPage,InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import Test from '@organisms/Test'
import { shuffleArray } from '@utils/shuffleArray'

type Question = {
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

const Quiz: NextPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  
  console.log(JSON.parse(data))
  return (
    <div>
      Quiz Page
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  
  const response = await fetch('https://wusical-questions-api.herokuapp.com/questions/amount/5')
  
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  const transformedData = data.map((question: Question) => {
    return (
      {
        id: question._id,
        description: question.translations.en.description,
        hint: question.translations.en.hint,
        answers: shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer
        ]),
        correct_answer: question.correct_answer
      }
    )
  })

  return {
    props: {
      data: JSON.stringify(transformedData)
    }
  }
}

export default Quiz