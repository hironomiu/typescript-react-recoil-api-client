import { useEffect, useState } from 'react'
import { isLoginAtom } from '../recoil/global'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'

const FETCH_GET_NOTIFICATION = '/api/v1/notifications'
const API_URL = new URL(FETCH_GET_NOTIFICATION, process.env.REACT_APP_API_URL)

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

  useEffect(() => {
    if (!isLogin) navigate('/auth')
  }, [navigate, isLogin])

  useEffect(() => {
    if (isLogin) {
      ;(async () => {
        const res = await fetch(API_URL.toString(), {
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'include',
        })
        const data = await res.json()
        console.log(data.data)
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
