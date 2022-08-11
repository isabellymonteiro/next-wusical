type CreateUserResponse = {
  name: string;
  job: string;
  id: string;
  createdAt: string;
};

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
    return e
  }
}

