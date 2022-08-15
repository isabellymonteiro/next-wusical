import { MongoClient } from 'mongodb'

export async function connectToUsersDatabase() {
  const client = await MongoClient.connect(process.env.USERS_DB_URL)
  return client
}

// github auth
export const clientPromise = MongoClient.connect(process.env.USERS_DB_URL)