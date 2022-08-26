import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import AlbumCard from '@molecules/AlbumCard'
import { getUserData } from '@services/api'
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

type Favorites = {
  [albumId: string]: boolean
}

const AlbumList = ({ albums, onlyFavorites }: Props) => {
  const [userFavorites, setUserFavorites] = useState<Favorites>()
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const { data: session } = useSession()
  const userEmail = session?.user?.email

  useEffect(() => {
    const fetchUserData = async(userEmail: string | null | undefined) => {
      if (!userEmail) {
        if (!loading) setLoading(true)
        return
      }

      if (!loading) setLoading(true)

      const userData = await getUserData(userEmail)

      if (userData.error) {
        setError(true)
        return
      }
      setUserFavorites(userData.favorites)
      setLoading(false)
    }
    
    fetchUserData(userEmail)
  }, [userEmail])

  return (
    <>
      {error && <Error />}
      {loading && !error &&
        <div className={classes.albumList__loading}><LoadingSpinner /></div>
      }
      {userFavorites && !loading && (
        <>
          {onlyFavorites && Object.keys(userFavorites).length === 0 ? 
            <p className={classes['albumList--empty']}>You haven't liked anything yet.</p> : (
            <ul className={classes.albumList}>
              {albums.map((album: Album) => {
                if (onlyFavorites) {
                  if (userFavorites[album._id]) {
                    return (
                      <AlbumCard 
                        key={album._id}
                        userEmail={userEmail!}
                        album={album}
                        isFavorited
                      />
                    )
                  }
                } else {
                  if (userFavorites[album._id]) {
                    return (
                      <AlbumCard 
                        key={album._id}
                        userEmail={userEmail!}
                        album={album}
                        isFavorited
                      />
                    )
                  }

                  return (
                    <AlbumCard 
                      key={album._id}
                      userEmail={userEmail!}
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