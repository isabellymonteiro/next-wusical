import { useState, MouseEvent } from 'react'
import { updateFavorite } from '@services/api'

import classes from './styles.module.scss'

type Props = {
  userEmail: string,
  albumId: string
}

const LikeButton = ({ userEmail, albumId }: Props) => {
  const [liked, setLiked] = useState(false)

  const handleLikeButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLiked(prev => !prev)
    await updateFavorite(userEmail, albumId)
  }

  return (
    <button
      type='button'
      className={classes.likeButton}
      onClick={handleLikeButton}
      aria-label={liked ? 'Dislike' : 'Like'}
    >
      <svg className={classes.likeButton__image} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.502 8.2786e-06C14.6288 -0.00149138 13.7674 0.200775 12.9862 0.590718C12.205 0.980661 11.5256 1.54752 11.002 2.24621C10.2928 1.30266 9.30487 0.606001 8.17799 0.254824C7.0511 -0.0963541 5.84231 -0.0842713 4.72267 0.289363C3.60303 0.662997 2.62923 1.37926 1.93907 2.3368C1.24892 3.29434 0.877352 4.44467 0.876953 5.62501C0.876953 12.3621 10.237 17.6813 10.6355 17.9044C10.7474 17.9671 10.8736 18 11.002 18C11.1303 18 11.2565 17.9671 11.3684 17.9044C13.0899 16.8961 14.7056 15.7173 16.1912 14.3856C19.4663 11.438 21.127 8.49047 21.127 5.62501C21.1253 4.13368 20.5321 2.70393 19.4776 1.6494C18.423 0.594873 16.9933 0.00169855 15.502 8.2786e-06Z"
          fill={liked ? "#FF6363" : "#FFF"}
        />
      </svg>
    </button>
  )
}

export default LikeButton