import Link from 'next/link'
import Image from 'next/image'
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
  const slug = createSlug(artist, name, _id)

  return (
    <li className={classes.albumCard}>
      <Link 
        href={{
          pathname: `/discover/${slug}`,
          query: {
            _id,
            artist,
            name,
            image,
            releaseYear,
            language,
            genre,
            spotify
          }
        }}
        as={`/discover/${slug}`}
      >
        <a className={classes.albumCard__link}>
          <Image 
            src={image}
            width={200}
            height={200}
            alt={`${name} album cover artwork`}
            className={classes.albumCard__image}
          />
          <h2 className={classes.albumCard__title}>{name}</h2>
          <p className={classes.albumCard__artist}>{artist}</p>
        </a>
      </Link> 
    </li>
  )
}

export default AlbumCard
