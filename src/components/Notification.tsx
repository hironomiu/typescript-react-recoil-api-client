import { memo } from 'react'
import { useNotification } from '../hooks/useNotification'

const Notification = memo(() => {
  const { notifications } = useNotification()

  return (
    <div className="flex flex-col h-[86vh] justify-center items-center">
      <h1 className="text-2xl">Notification</h1>
      <div>
        {notifications.data.map((notification, index) => (
          <div key={index} className="flex flex-col">
            <div>
              <span>{notification.title}</span>
            </div>
            {/* <div>
              <span>{notification.notification}</span>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  )
})

export default Notification
