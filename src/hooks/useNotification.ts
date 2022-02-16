import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useRecoilState } from 'recoil'
import { isLoginAtom } from '../recoil/global'
import { notificationCountSelector } from '../recoil/notification'

const FETCH_GET_NOTIFICATION = '/api/v1/notifications'
const API_URL = new URL(FETCH_GET_NOTIFICATION, process.env.REACT_APP_API_URL)

type NotificationData = {
  isSuccess: boolean
  message: string
  data: { title: string; notification: string; is_confirmed: boolean }[]
}

export const useNotification = () => {
  const navigate = useNavigate()
  const isLogin = useRecoilValue(isLoginAtom)
  const [notifications, setNotifications] = useState<NotificationData>({
    isSuccess: true,
    message: 'test',
    data: [{ title: '', notification: '', is_confirmed: false }],
  })

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
  }, [isLogin, setNotifications, setNotificationCount])

  const fetchGetNotification = async () => {
    const res = await fetch(API_URL.toString(), {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
    })
    const data: Response = await res.json()
    return data
  }
  return { notifications, fetchGetNotification }
}
