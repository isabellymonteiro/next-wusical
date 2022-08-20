import classes from './styles.module.scss'

type GenreProps = {
  genre: string[]
}

const AlbumGenres = ({ genre }: GenreProps) => {
  const genres = (typeof genre === 'string') ? (
      <li className={classes.albumGenres__genre}>
        {genre}
      </li>
    ) : (
      genre.map((item) => {
      return (
        <li 
          key={item} 
          className={classes.albumGenres__genre}
        >
          {item}
        </li>
      )
  }))

  return (
    <ul className={classes.albumGenres__list}>
        {genres}
    </ul>
  )
}

export default AlbumGenres