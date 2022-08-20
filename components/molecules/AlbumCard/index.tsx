import Link from 'next/link'
import Image from 'next/image'
import type { Album } from '@pages/discover'
import { createSlug } from '@helpers/slug'
import LikeButton from '@atoms/LikeButton'

import classes from './styles.module.scss'

type Props = {
  userEmail: string,
  album: Album
}

const AlbumCard = ({ userEmail, album }: Props) => {
  const { 
    _id,
    artist,
    name,
    image,
    releaseYear,
    language,
    genre,
    spotify
  } = album

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
          <LikeButton userEmail={userEmail} albumId={_id}/>
          <h2 className={classes.albumCard__title}>{name}</h2>
          <p className={classes.albumCard__artist}>{artist}</p>
        </a>
      </Link> 
    </li>
  )
}

export default AlbumCard
