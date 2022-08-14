import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Message, { MessageType } from './message'

export interface MessageApi {
  info: (text: string) => void;
  success: (text: string) => void;
  warning: (text: string) => void;
  error: (text: string) => void;
}

export interface Notice {
  text: string;
  key: string;
  type: MessageType;
  timeout: number;
}

let seed = 0
const now = Date.now()
const getUuid = (): string => {
  const id = seed
  seed += 1
  return `MESSAGE_${now}_${id}`
}

let add: (notice: Notice) => void
const defaultTimeout = 3 * 1000


export const MessageContainer = () => {
  const [notices, setNotices] = useState<Notice[]>([])
  const maxCount = 10

  const remove = (notice: Notice) => {
    const { key } = notice

    setNotices((prevNotices) => (
      prevNotices.filter(({ key: itemKey }) => key !== itemKey)
    ))
  }

  add = (notice: Notice) => {
    setNotices((prevNotices) => [...prevNotices, notice])

    setTimeout(() => {
      remove(notice)
    }, notice.timeout)
  }

  useEffect(() => {
    if (notices.length > maxCount) {
      const [firstNotice] = notices
      remove(firstNotice)
    }
  }, [notices])

  return (
    <div className="message-container">
        {
          notices.map(({ text, key, type }) => (
            <Message type={type} text={text} />
          ))
        }
    </div>
  )
}

let el = document.querySelector('#message-wrapper')
if (!el) {
  el = document.createElement('div')
  el.className = 'message-wrapper'
  el.id = 'message-wrapper'
  document.body.append(el)
}

ReactDOM.render(
  <MessageContainer />,
  el
)

const api: MessageApi = {
  info: (text, timeout = defaultTimeout) => {
    add({
      text,
      key: getUuid(),
      type: 'info',
      timeout
    })
  },
  success: (text, timeout = defaultTimeout) => {
    add({
      text,
      key: getUuid(),
      type: 'success',
      timeout
    })
  },
  warning: (text, timeout = defaultTimeout) => {
    add({
      text,
      key: getUuid(),
      type: 'warning',
      timeout
    })
  },
  error: (text, timeout = defaultTimeout) => {
    add({
      text,
      key: getUuid(),
      type: 'error',
      timeout
    })
  }
}

export default api