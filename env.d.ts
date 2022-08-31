declare global {
  namespace NodeJS {
    interface ProcessEnv {
      USERS_DB_URL: string,
      ALBUMS_DB_URL: string,
      QUESTIONS_DB_URL: string,
      NEXTAUTH_SECRET: string,
      NEXTAUTH_URL: string,
      GITHUB_ID: string,
      GITHUB_SECRET: string
    }
  }
}

export {}