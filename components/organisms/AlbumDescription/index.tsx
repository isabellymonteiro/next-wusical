import AlbumGenres from '@molecules/AlbumGenres'
import Image from 'next/image'

import classes from './styles.module.scss'

type AlbumDescriptionProps = {
  artist: string
  name: string
  image: string
  releaseYear: string
  language: string
  genre: string[]
}

const AlbumDescription = ({
  artist,
  name,
  image,
  releaseYear,
  language,
  genre,
}: AlbumDescriptionProps) => {

  return (
    <div className={classes.albumDescription}>
      <Image 
        src={image}
        width={200}
        height={200}
        alt={`${name} album cover artwork`}
        className={classes.albumDescription__image}
      />
      <h2 className={classes.albumDescription__title}>{name}</h2>
      <p className={classes.albumDescription__artist}>{artist}</p>
      <AlbumGenres genre={genre} />
      <div className={classes.albumDescription__moreInfo}>
        <span className={classes.albumDescription__year}>Release year: {releaseYear}</span>
        <span className={classes.albumDescription__language}>Language: {language}</span>
      </div>
    </div>
  )
}

export default AlbumDescription
