import { memo, useState } from 'react'
import { useNotification } from '../hooks/useNotification'
import NotificationMessageModal from './modal/NotificationMessageModal'

const Notification = memo(() => {
  const { notifications } = useNotification()
  const [modalOn, setModalOn] = useState(false)
  const [index, setIndex] = useState(0)

  return (
    <div className="flex flex-col h-[86vh] justify-center items-center">
      <h1 className="text-2xl">Notification</h1>
      <div>
        {notifications.data.map((notification, index) => (
          <div key={index} className="flex flex-col">
            <div>
              <span
                onClick={() => {
                  setIndex(index)
                  setModalOn(true)
                }}
              >
                {notification.title}
              </span>
            </div>
          </div>
        ))}
        {modalOn ? (
          <NotificationMessageModal
            setModalOn={setModalOn}
            message={notifications.data[index]}
          />
        ) : null}
      </div>
    </div>
  )
})

export default Notification
