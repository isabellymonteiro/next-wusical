import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import DefaultLayout from '@layouts/DefaultLayout'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </SessionProvider>
  )
}

export default MyApp
