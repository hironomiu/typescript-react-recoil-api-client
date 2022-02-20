import { memo, useState } from 'react'
import { useNotification } from '../hooks/useNotification'
import { csrfTokenSelector } from '../recoil/global'
import { useRecoilState } from 'recoil'
import NotificationMessageModal from './modal/NotificationMessageModal'

const FETCH_PUT_NOTIFICATION = '/api/v1/notifications'
const NOTIFICATION_API_URL = new URL(
  FETCH_PUT_NOTIFICATION,
  process.env.REACT_APP_API_URL
)

const Notification = memo(() => {
  const { notifications } = useNotification()
  const [modalOn, setModalOn] = useState(false)
  const [index, setIndex] = useState(0)
  const [csrfToken] = useRecoilState(csrfTokenSelector)

  const updateIsConfirmed = (id: number) => {
    console.log(csrfToken)

    fetch(NOTIFICATION_API_URL.toString(), {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken,
      },
      body: JSON.stringify({ id: id }),
    })
  }
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
                  onClick={() => {
                    setIndex(index)
                    console.log(notifications.data[index])
                    updateIsConfirmed(notifications.data[index].id)
                    setModalOn(true)
                  }}
                >
                  {notification.title}
                </span>
              ) : (
                <span
                  className="text-red-400 hover:cursor-pointer"
                  onClick={() => {
                    setIndex(index)
                    console.log(notifications.data[index])
                    updateIsConfirmed(notifications.data[index].id)
                    setModalOn(true)
                  }}
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
            message={notifications.data[index]}
          />
        ) : null}
      </div>
    </div>
  )
})

export default Notification
