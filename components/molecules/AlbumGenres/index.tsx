import classes from './styles.module.scss'

type GenreProps = {
  genre: string[]
}

const AlbumGenres = ({ genre }: GenreProps) => {
  const genres = (genre.length === 1) ? (
      <li className={classes.albumGenres__genre}>
        {genre[0]}
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