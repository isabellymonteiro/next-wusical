import Head from 'next/head'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import DefaultLayout from '@layouts/DefaultLayout'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <DefaultLayout>
        <Head>
          <title>Wusical</title>
          <meta name='description' content='Women in Music — quiz and discover' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Component {...pageProps} />
      </DefaultLayout>
    </SessionProvider>
  )
}

export default MyApp
