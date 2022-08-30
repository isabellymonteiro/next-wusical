import { useRef, KeyboardEvent } from 'react'
import SearchIcon from '@atoms/icons/Search'

import classes from './styles.module.scss'

type Props = {
  handleSearch: (searchTerm: string) => void
}

const Searchbar = ({ handleSearch }: Props) => {
  const searchbarInputRef = useRef<HTMLInputElement>(null)

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch(searchbarInputRef?.current?.value.trim()!)
  }

  return (
    <div className={classes.searchbar}>
      <div className={classes.searchbar__inputContainer}>
        <label 
          htmlFor='searchbarInput'
          className={classes['searchbar__inputLabel--visuallyHidden']}
        >
          Search album or artist
        </label>
        <input
          className={classes.searchbar__input}
          type='search'
          id='searchbarInput'
          placeholder='Search album or artist'
          onKeyPress={handleOnKeyPress}
          ref={searchbarInputRef}
        />
      </div>
      <button
        type='button'
        aria-label='Search'
        className={classes.searchbar__button}
        onClick={() => handleSearch(searchbarInputRef?.current?.value.trim()!)}
      >
        <SearchIcon />
      </button>
    </div>
  )
}

export default Searchbar