import { MouseEvent, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import Settings from '@atoms/icons/Settings'
import useAutoClose from '@hooks/useAutoClose'

import classes from './styles.module.scss'

const UserSettings = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const menu = useRef<HTMLUListElement | null>(null)

  const router = useRouter()

  useAutoClose(setIsDropdownOpen, menu)


  const handleSettingsMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
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
        type='button'
        className={classes.userSettings__button}
        onClick={handleSettingsMenu}
        aria-haspopup='menu'
        aria-expanded={isDropdownOpen}
        aria-label={isDropdownOpen ? 'Close settings menu' : 'Open settings menu'}
      >
        <Settings />
      </button>
      <ul
        ref={menu}
        aria-hidden={!isDropdownOpen}
        className={`${classes.userSettings__dropdown}
        ${isDropdownOpen ? classes['userSettings__dropdown--open'] : ''}`}>
        <li 
          key='Change Password' 
          className={classes.userSettings__item}
          onClick={handleDropdownClick}
        >
          <Link href={'/change-password'}>
            <a className={`${classes.userSettings__link} ${router.pathname === '/change-password' ? classes['userSettings__link--active'] : ''}`}>
              Change Password
            </a>
          </Link>
        </li>
        <li className={classes.userSettings__item}>
          <button className={classes.userSettings__listButton} onClick={handleLogOut}>Log out</button>
        </li>
      </ul>
    </div>
  )
}

export default UserSettings