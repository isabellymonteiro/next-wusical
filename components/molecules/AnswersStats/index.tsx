import Link from 'next/link'

import classes from './styles.module.scss'

type AnswersStatsProps = {
  correctAnswers: number,
  totalAnswers: number
}

const AnswersStats = ({ correctAnswers, totalAnswers }: AnswersStatsProps) => {

  const statsWidth = {
    width: (correctAnswers / totalAnswers * 100) + '%'
  }

  return (
    <>
      {totalAnswers === 0 ?
        <div className={classes['answersStats--empty']}>
          <p>You haven&apos;t answered anything yet.</p>
          <Link href='/quiz'>
            <a className={classes.answersStats__link}>
              Go to quiz
            </a>
          </Link>
        </div> :
        <div className={classes.answersStats__container}>
          <div className={classes.answersStats__bar}>
            <div className={classes.answersStats__correct} style={statsWidth}></div>
          </div>
          <div className={classes.answersStats}>
            <div className={classes.answersStats__answers}>
              <span className={classes.answersStats__correctSquare}></span>
              <p>Correct answers: {correctAnswers} ({(correctAnswers / totalAnswers * 100).toFixed(2) + '%'})</p>
            </div>
            <div className={classes.answersStats__answers}>
              <span className={classes.answersStats__incorrectSquare}></span>
              <p>Incorrect answers: {totalAnswers - correctAnswers} ({((totalAnswers - correctAnswers) / totalAnswers * 100).toFixed(2) + '%'})</p>
            </div>
            <p>Total: {totalAnswers} (100%)</p>
          </div>
        </div>
      }
    </>
  )
}

export default AnswersStats
