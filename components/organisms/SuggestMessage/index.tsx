import { useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import FeedbackMessage, { MessageStatus, FeedbackMessageProps }from '@atoms/FeedbackMessage'
import { sendMessage } from '@services/api'

import classes from './styles.module.scss'

const SuggestMessage = () => {
  const { data: session } = useSession()

  const messageRef = useRef<HTMLTextAreaElement>(null)
  const [feedbackMessage, setFeedbackMessage] = useState<FeedbackMessageProps | null>(null)

  const sendMessageHandler = async () => {
    if (messageRef?.current?.value.trim().length! < 20) {
      setFeedbackMessage({ 
        text: 'Your message should be at least 20 characters long.',
        status: MessageStatus.ERROR
      })
    } else {
      const data = await sendMessage(session?.user?.email!, messageRef?.current?.value!)
      if (data.error) {
        setFeedbackMessage({ 
          text: data.error,
          status: MessageStatus.ERROR
        })
      } else {
        setFeedbackMessage({ 
          text: data.message,
          status: MessageStatus.SUCCESS
        })
      }
    }
  }
  
  return (
    <div className={classes.suggestMessage__container}>
      {feedbackMessage &&
        <FeedbackMessage 
          text={feedbackMessage.text} 
          status={feedbackMessage.status} 
        />
      }
      <div className={classes.suggestMessage}>
        <label className={classes.suggestMessage__label} htmlFor='SuggestMessage'>Message</label>
        <textarea 
          className={`${classes.suggestMessage__textarea} 
            ${feedbackMessage?.status === MessageStatus.ERROR ? 
            classes['suggestMessage__textarea--error'] : ''}`}
          id='SuggestMessage'
          name='SuggestMessage'
          ref={messageRef}
        >
        </textarea>
      </div>
        <button className={classes.suggestMessage__button} type='button' onClick={sendMessageHandler}>
          Send Message
        </button>
    </div>
  )
}

export default SuggestMessage