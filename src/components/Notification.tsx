import { memo } from 'react'
import { useNotification } from '../hooks/useNotification'
import NotificationMessageModal from './modal/NotificationMessageModal'

const Notification = memo(() => {
  const {
    notifications,
    handleClick,
    modalOn,
    setModalOn,
    modalNotiricationIndex,
  } = useNotification()

  return (
    <div className="flex flex-col h-[86vh] justify-center items-center">
      <h1 className="text-2xl mb-10">Notification</h1>
      <div>
        {notifications.data.map((notification, index) => (
          <div key={index} className="flex flex-col">
            <div>
              {notification.is_confirmed ? (
                <span
                  className="text-gray-400 hover:cursor-pointer"
                  onClick={() => handleClick(index)}
                >
                  {notification.title}
                </span>
              ) : (
                <span
                  className="text-red-400 hover:cursor-pointer"
                  onClick={() => handleClick(index)}
                >
                  {notification.title}
                </span>
              )}
            </div>
          </div>
        ))}
        {modalOn ? (
          <NotificationMessageModal
            setModalOn={setModalOn}
            message={notifications.data[modalNotiricationIndex]}
          />
        ) : null}
      </div>
    </div>
  )
})

export default Notification
