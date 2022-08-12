import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import Settings from '@atoms/icons/Settings'

import classes from './styles.module.scss'

const UserSettings = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const router = useRouter()

  const handleSettingsMenu = () => {
    setIsDropdownOpen((prevState) => !prevState)
  }

  const handleDropdownClick = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false)
    }
  }

  const handleLogOut = () => {
    signOut()
  }

  return (
    <div className={classes.userSettings}>
      <button
        className={classes.userSettings__button}
        onClick={handleSettingsMenu}
        aria-haspopup='menu'
        aria-expanded={isDropdownOpen ? 'true' : 'false'}
        aria-label={isDropdownOpen ? 'Close settings menu' : 'Open settings menu'}
      >
        <Settings />
      </button>
      <ul className={`${classes.userSettings__dropdown} ${isDropdownOpen ? classes['userSettings__dropdown--open'] : ''}`}>
        <li 
          key='Change Password' 
          className={classes.userSettings__item}
          onClick={handleDropdownClick}
        >
          {/* MUDAR /USER PARA SER DINÂMICO */}
          <Link href={'/user/change-password'}>
            <a className={`${classes.userSettings__link} ${router.pathname === '/user/change-password' ? classes['userSettings__link--active'] : ''}`}>
              Change Password
            </a>
          </Link>
        </li>
        <li>
          <button onClick={handleLogOut}>Log out</button>
        </li>
      </ul>
    </div>
  )
}

export default UserSettings