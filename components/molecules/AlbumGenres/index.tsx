import classes from './styles.module.scss'

type GenreProps = {
  genre: string[]
}

const AlbumGenres = ({ genre }: GenreProps) => {
  const genres = genre.map((item) => {
    return (
      <li 
        key={item} 
        className={classes.albumGenres__genre}
      >
        {item}
      </li>
    )
  })

  return (
    <ul className={classes.albumGenres__list}>
        {genres}
    </ul>
  )
}

export default AlbumGenres