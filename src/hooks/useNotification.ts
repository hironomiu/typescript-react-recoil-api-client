import { useEffect, useState } from 'react'
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

  // TODO Recoil?
  const [modalNotiricationIndex, setModalNotiricationIndex] = useState(0)
  const [modalOn, setModalOn] = useState(false)

  // TODO クリック後にカウントを減算、colorを変更
  const handleClick = async (index: number) => {
    setModalNotiricationIndex(index)
    console.log(notifications.data[index])
    console.log(notifications)
    const jsonData = await updateIsConfirmed(notifications.data[index].id)
    // TODO jsonData.isSuccess === falseの時の仕様を決める
    console.log(jsonData)
    setModalOn(true)
  }
  const updateIsConfirmed = async (id: number) => {
    const res = await fetch(NOTIFICATION_API_URL.toString(), {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken,
      },
      body: JSON.stringify({ id: id }),
    })
    return res.json()
  }

  useEffect(() => {
    if (!isLogin) navigate('/auth')
  }, [navigate, isLogin])

  return {
    notifications,
    updateIsConfirmed,
    handleClick,
    modalOn,
    setModalOn,
    modalNotiricationIndex,
  }
}
