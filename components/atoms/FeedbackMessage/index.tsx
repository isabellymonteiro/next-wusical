import classes from './styles.module.scss'

export enum MessageStatus {
  ERROR = 'error',
  SUCCESS = 'success'
}

export type FeedbackMessageProps = {
  text: string,
  status: MessageStatus
}

const FeedbackMessage = ({ text, status }: FeedbackMessageProps) => {
  return (
    <p className={`${classes.feedbackMessage} ${classes[`feedbackMessage--${status}`]}`}>
      {text}
    </p>
  )
}

export default FeedbackMessage