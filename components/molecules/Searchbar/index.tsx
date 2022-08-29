import { useRef, KeyboardEvent } from 'react'
import DefaultButton from '@atoms/DefaultButton'

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
          Search:
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
      <DefaultButton 
        text='Search' 
        type='button' 
        handleOnClick={() => handleSearch(searchbarInputRef?.current?.value.trim()!)}/>
    </div>
  )
}

export default Searchbar