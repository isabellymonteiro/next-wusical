import AlbumGenres from '@molecules/AlbumGenres'
import Image from 'next/image'

import classes from './styles.module.scss'

type AlbumDetailedProps = {
  artist: string
  name: string
  image: string
  releaseYear: string
  language: string
  genre: string[]
}

const AlbumDetailed = ({
  artist,
  name,
  image,
  releaseYear,
  language,
  genre,
}: AlbumDetailedProps) => {

  return (
    <div className={classes.albumDetailed}>
      <Image 
        src={image}
        width={300}
        height={300}
        alt={`${name} album cover artwork`}
        className={classes.albumDetailed__image}
      />
      <div className={classes.albumDetailed__content}>
        <h2 className={classes.albumDetailed__title}>{name}</h2>
        <p className={classes.albumDetailed__artist}>{artist}</p>
        <AlbumGenres genre={genre} />
        <div className={classes.albumDetailed__moreInfo}>
          <span className={classes.albumDetailed__year}>Release year: {releaseYear}</span>
          <span className={classes.albumDetailed__language}>Language: {language}</span>
        </div>
      </div>
    </div>
  )
}

export default AlbumDetailed
