import { useEffect, useState } from 'react'
import { isLoginAtom, notificationCountSelector } from '../recoil/global'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '../hooks/useNotification'

type NotificationData = {
  isSuccess: boolean
  message: string
  data: { title: string; notification: string }[]
}

const Notification = () => {
  const navigate = useNavigate()
  const isLogin = useRecoilValue(isLoginAtom)
  const [notifications, setNotifications] = useState<NotificationData>({
    isSuccess: true,
    message: 'test',
    data: [{ title: '', notification: '' }],
  })
  const { fetchGetNotification } = useNotification()
  const [, setNotificationCount] = useRecoilState(notificationCountSelector)

  useEffect(() => {
    if (!isLogin) navigate('/auth')
  }, [navigate, isLogin])

  useEffect(() => {
    if (isLogin) {
      console.log('hoge')
      ;(async () => {
        // TODO 型
        const data: any = await fetchGetNotification()
        // TODO Main読み込み時に設定する
        setNotificationCount(
          data.data.filter((data: any) => data.is_confirmed === 0).length
        )
        setNotifications(data)
      })()
    }
  }, [isLogin])

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
}

export default Notification
