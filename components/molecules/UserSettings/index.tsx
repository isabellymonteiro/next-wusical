import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Settings from '@atoms/icons/Settings'

import classes from './styles.module.scss'

const dropdownLinks = [
  // MUDAR /USER PARA SER DINÂMICO
  { name: 'Change Password', path: '/user/change-password'},
  { name: 'Log out', path: '/logout'},
]

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
        {dropdownLinks.map((link) => {
          return (
            <li 
              key={link.name} 
              className={classes.userSettings__item}
              onClick={handleDropdownClick}
            >
              <Link href={link.path}>
                <a className={`${classes.userSettings__link} ${router.pathname === link.path ? classes['userSettings__link--active'] : ''}`}>
                  {link.name}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default UserSettings