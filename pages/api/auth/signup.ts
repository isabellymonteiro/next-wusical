import { hashPassword } from '@helpers/auth'
import { connectToUsersDatabase } from '@helpers/db'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return
  }
  
  try {
    const data = req.body
    const { email, password } = data

    if (!email || email.trim() === '') {
      res.status(422).json({ message: 'Please, type your email.' })
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      res.status(422).json({ message: 'Please type a valid email.' })
    }

    if (!password || password.trim() === '') {
      res.status(422).json({ message: 'Please, type your password.' })
    } else if (password.trim().length < 8 || !/[0-9]/g.test(password)) {
      res.status(422).json({ message: 'Your password must be at least 8 characters long and contain at least one number.' })
    }

    const client = await connectToUsersDatabase()
    const db = client.db()

    const existingUser = await db.collection('users').findOne({ email: email })

    if (existingUser) {
      res.status(422).json({ message: 'User already exists'})
      client.close()
      return
    }

    const hashedPassword = await hashPassword(password)

    const result = await db.collection('users').insertOne({
      email: email,
      password: hashedPassword,
      favorites: {},
      correctAnswers: 0,
      totalAnswers: 0
    })

    res.status(201).json({ message: 'User created successfully'})
    client.close()

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

export default handler