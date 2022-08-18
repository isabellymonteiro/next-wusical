import Link from 'next/link'
import type { Album } from '@pages/discover'
import { createSlug } from '@helpers/slug'
import classes from './styles.module.scss'

const AlbumCard = ({
  _id,
  artist,
  name,
  image,
  releaseYear,
  language,
  genre,
  spotify,
}: Album) => {
  const slug = createSlug(artist, name)

  return (
    <li className={classes.albumCard}>
      <Link href={`/discover/${slug}`}>
        <a className={classes.albumCard__link}>
          {name}
        </a>
      </Link> 
    </li>
  )
}

export default AlbumCard
