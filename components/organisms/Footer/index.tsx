import classes from './styles.module.scss'

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__content}>
        <p className={classes.footer__paragraph}>
          &copy; 2022 <span className={classes.footer__wusical}>Wusical</span>
        </p>
        <p className={classes.footer__paragraph}>
          Developed by{' '}
          <a
            className={classes.footer__link}
            href='https://github.com/isabellymonteiro'
            target='_blank'
          >
            Isabelly Monteiro
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
