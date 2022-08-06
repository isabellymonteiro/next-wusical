import Link from 'next/link'
import Heart from '@atoms/icons/Heart'

import classes from './styles.module.scss'

const FavoritesLink = () => {
  return (
    <Link href='/favorites'>
      <a className={classes.favoritesLink}>
        <Heart />
      </a>
    </Link>
  )
}

export default FavoritesLink