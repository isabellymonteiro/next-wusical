import Link from 'next/link'
import AlbumCard from '@molecules/AlbumCard'
import useUserData from '@hooks/useUserData'
import LoadingSpinner from '@atoms/icons/LoadingSpinner'
import Error from '@molecules/Error'

import classes from './styles.module.scss'

export type Album = {
  _id: string,
  artist: string,
  name: string,
  image: string,
  releaseYear: string,
  language: string,
  genre: string[],
  spotify: string,
  isFavorited?: boolean
}

type Props = {
  albums: Album[],
  onlyFavorites?: boolean
}

const AlbumList = ({ albums, onlyFavorites }: Props) => {

 const { userData, error, loading } = useUserData()

  return (
    <>
      {error && <Error />}
      {loading && !error &&
        <div className={classes.albumList__loading}><LoadingSpinner /></div>
      }
      {userData?.favorites && !loading && (
        <>
          {onlyFavorites && 
          (Object.keys(userData.favorites).length === 0 ||
          Object.values(userData.favorites).every(value => value === false)) ?
            <div className={classes['albumList--empty']}>
              <p>You haven't liked anything yet.</p>
              <Link href='/discover'>
                <a className={classes.albumList__link}>
                  Go to discover
                </a>
              </Link>
            </div> : (
            <ul className={classes.albumList}>
              {albums.map((album: Album) => {
                if (onlyFavorites) {
                  if (userData.favorites[album._id]) {
                    return (
                      <AlbumCard 
                        key={album._id}
                        userEmail={userData.email}
                        album={album}
                        isFavorited
                      />
                    )
                  }
                } else {
                  if (userData.favorites[album._id]) {
                    return (
                      <AlbumCard 
                        key={album._id}
                        userEmail={userData.email}
                        album={album}
                        isFavorited
                      />
                    )
                  }

                  return (
                    <AlbumCard 
                      key={album._id}
                      userEmail={userData.email}
                      album={album}
                    />
                  )
                }
              })}
            </ul>
          )}
        </>
      )}
    </>
  )
}
 
export default AlbumList