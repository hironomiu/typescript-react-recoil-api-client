import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useRecoilState } from 'recoil'
import { isLoginAtom, csrfTokenSelector } from '../recoil/global'
import { notificationSelector } from '../recoil/notification'

const FETCH_PUT_NOTIFICATION = '/api/v1/notifications'
const NOTIFICATION_API_URL = new URL(
  FETCH_PUT_NOTIFICATION,
  process.env.REACT_APP_API_URL
)
export const useNotification = () => {
  const navigate = useNavigate()
  const [csrfToken] = useRecoilState(csrfTokenSelector)
  const isLogin = useRecoilValue(isLoginAtom)
  const [notifications] = useRecoilState(notificationSelector)

  const updateIsConfirmed = (id: number) => {
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

  useEffect(() => {
    if (!isLogin) navigate('/auth')
  }, [navigate, isLogin])

  return { notifications, updateIsConfirmed }
}