import { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useLayout } from '../hooks/useLayout'
import { useRecoilState } from 'recoil'
import { isLoginSelector } from '../recoil/global'
import Header from './Header'
import Footer from './Footer'

const Layout: FC = () => {
  const { fetchGetIsLogin } = useLayout()
  const [isLogin, setIsLogin] = useRecoilState(isLoginSelector)
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const data = await fetchGetIsLogin()
      if (data.isSuccess) setIsLogin(true)
    })()
  }, [fetchGetIsLogin, setIsLogin])

  useEffect(() => {
    if (!isLogin) navigate('/signin')
  }, [isLogin, navigate])

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
