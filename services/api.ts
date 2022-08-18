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

export const getAlbums = async () => {
  try {
    const response = await fetch('api/discover/albums')
   
    const data = await response.json()
 
    if (!response.ok) {
      throw new Error(data.message)
    }
 
    return data
 
  } catch (e: any) {
    return { error: e.message }
  }
}


