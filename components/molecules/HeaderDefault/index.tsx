import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'


import classes from './styles.module.scss'

const links = [
  { name: 'Log in', path: '/login' },
  { name: 'Sign up', path: '/signup' }
]

const HeaderDefault = () => {
  const router = useRouter()

  return (
    <ul className={classes.headerDefault}>
      {links.map((link) => {
        return (
          <li key={link.name} className={classes.headerDefault__item}>
            <Link href={link.path}>
              <a className={`${classes.headerDefault__link} ${router.pathname === link.path ? classes['headerDefault__link--active'] : ''}`}>
                {link.name}
              </a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default HeaderDefault

