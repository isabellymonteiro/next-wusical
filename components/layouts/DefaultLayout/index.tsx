import Header from '@organisms/Header'
import Footer from '@organisms/Footer'

import classes from './styles.module.scss'

type LayoutProps = {
  children: React.ReactNode
}

export default function DefaultLayout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className={classes.page__content}>{children}</main>
      <Footer />
    </>
  )
}