import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useWindowWidth from '@hooks/useWindowWidth'
import MenuClose from '@atoms/icons/MenuClose'
import MenuOpen from '@atoms/icons/MenuOpen'

import classes from './styles.module.scss'

const navLinks = [
  { name: 'Quiz', path: '/quiz'},
  { name: 'Discover', path: '/discover'},
  { name: 'Suggestions', path: '/suggestions'}
]

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const router = useRouter()
  const windowWidth = useWindowWidth()
  
  useEffect(() => {
    if (windowWidth && windowWidth >= 1024) {
      setIsMobileMenuOpen(false)
      console.log(windowWidth)
    }
  }, [windowWidth])
  
  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen((prevState) => !prevState)
  }
  
  const handleMobileNavigationClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav className={classes.navbar__container}>
      <button
        className={classes.mobileNavbar__button}
        onClick={handleMobileMenuClick}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMobileMenuOpen ? <MenuClose /> : <MenuOpen />}
      </button>
      <div className={`${classes.navbar} ${isMobileMenuOpen ? classes['mobileNavbar--open'] : classes['mobileNavbar--close']}`}>
        <ul className={classes.navbar__items}>
          {navLinks.map((link) => {
            return (
              <li key={link.name} className={classes.navbar__item} onClick={handleMobileNavigationClick}>
                <Link href={link.path}>
                  <a className={`${classes.navbar__link} ${router.pathname === link.path ? classes['navbar__link--active'] : ''}`}>
                    {link.name}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

