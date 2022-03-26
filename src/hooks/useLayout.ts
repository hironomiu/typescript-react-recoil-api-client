import { useCallback, useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { isLoginAtom } from '../recoil/global'
import {
  notificationCountSelector,
  notificationSelector,
} from '../recoil/notification'

const FETCH_GET_IS_LOGIN = '/api/v1/auth/signin'
const API_URL = new URL(FETCH_GET_IS_LOGIN, process.env.REACT_APP_API_URL)

const FETCH_GET_NOTIFICATION = '/api/v1/notifications'
const NOTIFICATION_API_URL = new URL(
  FETCH_GET_NOTIFICATION,
  process.env.REACT_APP_API_URL
)

export const useLayout = () => {
  const isLogin = useRecoilValue(isLoginAtom)
  const [, setNotificationCount] = useRecoilState(notificationCountSelector)
  const [, setNotifications] = useRecoilState(notificationSelector)

  const fetchGetNotification = useCallback(async () => {
    const res = await fetch(NOTIFICATION_API_URL.toString(), {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
    })
    const data: Response = await res.json()
    return data
  }, [])

  const fetchGetIsLogin = useCallback(async () => {
    const res = await fetch(API_URL.toString(), {
      method: 'GET',
      credentials: 'include',
    })
    const data = await res.json()
    return data
  }, [])

  useEffect(() => {
    if (isLogin) {
      ;(async () => {
        // TODO 型
        const data: any = await fetchGetNotification()
        // TODO 型
        setNotificationCount(
          data.data.filter((data: any) => data.is_confirmed === 0).length
        )
        setNotifications(data)
      })()
    }
  }, [isLogin, fetchGetNotification, setNotifications, setNotificationCount])

  return { fetchGetIsLogin }
}
