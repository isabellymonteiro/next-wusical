import AlbumCard from '@molecules/AlbumCard'
import type { Album } from '@pages/discover'
import classes from './styles.module.scss'

type Props = {
  albums: Album[],
  userEmail: string
}

const AlbumList = ({ albums, userEmail }: Props) => {
  return (
    <ul className={classes.albumList}>
      {albums.map((album: Album) => {
        return (
          <AlbumCard 
            key={album._id}
            userEmail={userEmail}
            album={album}
          />
        )
      })}
    </ul>
  )
}
 
export default AlbumList
