import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Navbar from '@molecules/Navbar'
import FavoritesLink from '@molecules/FavoritesLink'
import UserSettings from '@molecules/UserSettings'

import classes from './styles.module.scss'

const Header = () => {
  const { data: session } = useSession()
  
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
      </div>
    </header>
  )
}

export default Header