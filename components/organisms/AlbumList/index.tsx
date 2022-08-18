import AlbumCard from '@molecules/AlbumCard'
import type { Album, AlbumData } from '@pages/discover'
import classes from './styles.module.scss'

const AlbumList = ({ albums }: AlbumData) => {
  return (
    <ul className={classes.albumList}>
      {albums.map((album: Album) => {
        return (
          <AlbumCard 
            key={album._id}
            _id={album._id}
            artist={album.artist}
            name={album.name}
            image={album.image}
            releaseYear={album.releaseYear}
            language={album.language}
            genre={album.genre}
            spotify={album.spotify}
          />
        )
      })}
    </ul>
  )
}
 
export default AlbumList
