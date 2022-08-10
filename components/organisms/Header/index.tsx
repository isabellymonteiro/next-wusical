import Link from 'next/link'
import { useState } from 'react'
import Navbar from '@molecules/Navbar'
import FavoritesLink from '@atoms/FavoritesLink'
import UserSettings from '@molecules/UserSettings'
import HeaderDefault from '@molecules/HeaderDefault'

import classes from './styles.module.scss'

const Header = () => {

  // authentication context here but for now:
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  return (
    <header className={classes.header}>
      <div className={`${isLoggedIn ? classes.header__userContent : classes.header__defaultContent}`}>
        <Link href='/'>
           <a className={classes.header__logo}>Wusical</a>
        </Link>
        {isLoggedIn ?
          <>
            <Navbar />
            <div className={classes.header__userLinks}>
              <FavoritesLink />
              <UserSettings />
            </div>
          </> :
          <HeaderDefault />
        }
      </div>
    </header>
  )
}

export default Header