import { shuffleArray } from '@utils/shuffleArray'

const handleError = (e: unknown) => {
  if (e instanceof Error) {
    return { error: e.message }
  }

  return { error: 'Unknown error' }
}

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

export const createUser = async (email: string, password: string) => {
  try {
    const response = await fetch('api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }

    return data

  } catch (e: unknown) {
    return handleError(e)
  }
}

export const changePassword = async (passwordData: { oldPassword: string, newPassword: string }) => {
  try {
    const response = await fetch('api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }

    return data

  } catch (e: unknown) {
    return handleError(e)
  }
}

export const updateFavorite = async (userEmail: string, albumId: string) => {
  try {
    const response = await fetch('api/user/favorite', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userEmail: userEmail,
        albumId: albumId
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }
  } catch (e: unknown) {
    return handleError(e)
  }
}

export const getUserData = async (userEmail: string) => {
  try {
    const response = await fetch(`api/user/${userEmail}`)

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }

    return data.user

  } catch (e: unknown) {
    return handleError(e)
  }
}

export const sendMessage = async (message: string) => {
  try {
    const response = await fetch(`api/suggestion`, {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }

    return data

  } catch (e: unknown) {
    return handleError(e)
  }
}

export const getQuestions = async (total: number) => {
  try {
    const response = await fetch(`api/questions/${total}`)

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }

    const transformedData = data.questions.map((question: AllQuestionData) => {
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

    return transformedData

  } catch (e: unknown) {
    return handleError(e)
  }
}

export const updateUserAnswers = async (correctAnswers: number, totalAnswers: number) => {
  try {
    const response = await fetch('api/user/update-answers', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correctAnswers: correctAnswers,
        totalAnswers: totalAnswers
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }
  } catch (e: unknown) {
    return handleError(e)
  }
}