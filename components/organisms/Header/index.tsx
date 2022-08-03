import classes from './styles.module.scss'
import Navbar from '@molecules/Navbar'

const Header = () => {
  return (
    <header>
      <p className={classes.paragraph}>header test</p>
      <Navbar />
    </header>
  )
}

export default Header