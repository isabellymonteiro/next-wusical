import classes from './styles.module.scss'

type AnswersStatsProps = {
  correctAnswers: number,
  totalAnswers: number
}

const AnswersStats = ({ correctAnswers, totalAnswers }: AnswersStatsProps) => {

  const statsWidth = {
    width: (correctAnswers / totalAnswers * 100) + '%'
  }
  console.log(statsWidth)

  return (
    <div className={classes.answersStats__container}>
      <div className={classes.answersStats} style={statsWidth}></div>
    </div>
  )
}

export default AnswersStats
