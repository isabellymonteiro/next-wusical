import Link from 'next/link'
import Navbar from '@molecules/Navbar'

import classes from './styles.module.scss'

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <Link href='/'>
           <a className={classes.header__logo}>Wusical</a>
        </Link>
        <Navbar />
      </div>
    </header>
  )
}

export default Header