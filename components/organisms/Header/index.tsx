import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Navbar from '@molecules/Navbar'
import FavoritesLink from '@molecules/FavoritesLink'
import UserSettings from '@molecules/UserSettings'
import HeaderDefault from '@molecules/HeaderDefault'

import classes from './styles.module.scss'

const Header = () => {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  
  return (
    <header className={classes.header}>
      <div className={`${session ? classes.header__userContent : classes.header__defaultContent}`}>
        <Link href='/'>
           <a className={classes.header__logo}>Wusical</a>
        </Link>
        {session &&
          <>
            <Navbar />
            <div className={classes.header__userLinks}>
              <FavoritesLink />
              <UserSettings />
            </div>
          </>
        }
        {!session && !loading && <HeaderDefault />}
      </div>
    </header>
  )
}

export default Header