import classes from './styles.module.scss'

type Props = {
  title: string
}

const PageTitle = ({ title }: Props) => {
  return (
    <h1 className={classes.pageTitle}>{title}</h1>
  )
}

export default PageTitle