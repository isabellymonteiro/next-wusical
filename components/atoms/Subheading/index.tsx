import classes from './styles.module.scss'

type Props = {
  title: string
}

const Subheading = ({ title }: Props) => {
  return (
    <h2 className={classes.subheading}>{title}</h2>
  )
}

export default Subheading