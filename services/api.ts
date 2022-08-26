import { shuffleArray } from '@utils/shuffleArray'

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
    
  } catch (e: any) {
    return { error: e.message }
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
    
  } catch (e: any) {
    return { error: e.message }
  }
}

/* 
- called directly inside getStaticProps instead (runs on the server, no need to fetch my own api)

export const getAlbums = async () => {
  try {
    const response = await fetch('api/albums')
   
    const data = await response.json()
 
    if (!response.ok) {
      throw new Error(data.message)
    }
 
    return data
 
  } catch (e: any) {
    return { error: e.message }
  }
} */

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
    
    //return data
 
  } catch (e: any) {
    return { error: e.message }
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
 
  } catch (e: any) {
    return { error: e.message }
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
 
  } catch (e: any) {
    return { error: e.message }
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
    
  } catch (e: any) {
    return { error: e.message }
  }
}