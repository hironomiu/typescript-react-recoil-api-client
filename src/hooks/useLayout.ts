import { useCallback, useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { isLoginAtom } from '../recoil/global'
import {
  notificationCountSelector,
  notificationSelector,
} from '../recoil/notification'
import { ResFetchGetNotification, ResFetchGetNotificationData } from '../types'

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
    const data: ResFetchGetNotification = await res.json()
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
        const res: ResFetchGetNotification = await fetchGetNotification()
        setNotificationCount(
          res.data.filter(
            (data: ResFetchGetNotificationData) => data.is_confirmed === false
          ).length
        )
        setNotifications(res)
      })()
    }
  }, [isLogin, fetchGetNotification, setNotifications, setNotificationCount])

  return { fetchGetIsLogin }
}
