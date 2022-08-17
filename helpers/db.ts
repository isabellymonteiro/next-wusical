import { MongoClient } from 'mongodb'

export async function connectToUsersDatabase() {
  const client = await MongoClient.connect(process.env.USERS_DB_URL)
  return client
}

export async function connectToAlbumsDatabase() {
  const client = await MongoClient.connect(process.env.ALBUMS_DB_URL)
  return client
}

// github auth
export const clientPromise = MongoClient.connect(process.env.USERS_DB_URL)