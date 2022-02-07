import { useEffect } from 'react'
import { isLoginAtom } from '../recoil/global'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'

const Notification = () => {
  const navigate = useNavigate()
  const isLogin = useRecoilValue(isLoginAtom)
  useEffect(() => {
    if (!isLogin) navigate('/auth')
  }, [])
  return (
    <div className="flex h-[86vh] justify-center items-center">
      <span>Notification</span>
    </div>
  )
}

export default Notification
