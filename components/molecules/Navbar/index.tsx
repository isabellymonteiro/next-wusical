import Link from 'next/link'
import { useRouter } from 'next/router'

import classes from './styles.module.scss'

const navLinks = [
  { name: 'Quiz', path: '/quiz'},
  { name: 'Discover', path: '/discover'},
  { name: 'Suggestions', path: '/suggestions'}
]

const Navbar = () => {

  const router = useRouter()

  return (
    <nav>
      <ul className={classes.navbar}>
        {navLinks.map((link) => {
          return (
            <li key={link.name}>
              <Link href={link.path}>
                <a className={router.pathname === link.path ? classes['navbar__link--active'] : ''}>
                  {link.name}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navbar