import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { getUserData } from '@services/api'

type UserData = {
  id: string,
  email: string,
  favorites: {[albumId: string]: boolean},
  correctAnswers: number,
  totalAnswers: number
}

const useUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const { data: session } = useSession()
  const userEmail = session?.user?.email

  useEffect(() => {
    const fetchUserData = async(userEmail: string | null | undefined) => {
      if (!userEmail) {
        if (!loading) setLoading(true)
        return
      }

      if (!loading) setLoading(true)

      const userInfo = await getUserData(userEmail)

      if (userInfo.error) {
        setError(true)
        return
      }

      setUserData(userInfo)
      setLoading(false)
    }
    
    fetchUserData(userEmail)
  }, [userEmail])

  return {
    userData,
    error,
    loading
  }
}

export default useUserData
