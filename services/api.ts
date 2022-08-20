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
    const response = await fetch('api/discover/albums')
   
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
    const response = await fetch('api/discover/favorite', {
      method: 'PUT',
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


