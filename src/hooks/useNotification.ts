import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useRecoilState } from 'recoil'
import { isLoginAtom } from '../recoil/global'
import { notificationSelector } from '../recoil/notification'

export const useNotification = () => {
  const navigate = useNavigate()
  const isLogin = useRecoilValue(isLoginAtom)
  const [notifications] = useRecoilState(notificationSelector)

  useEffect(() => {
    if (!isLogin) navigate('/auth')
  }, [navigate, isLogin])

  return { notifications }
}
