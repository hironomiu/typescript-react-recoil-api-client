import { FC, useEffect } from 'react'
import Header from './Header'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useLayout } from '../hooks/useLayout'
import { useRecoilState } from 'recoil'
import { isLoginSelector } from '../recoil/global'

const Layout: FC = () => {
  const { fetchIsLogin } = useLayout()
  const [isLogin, setIsLogin] = useRecoilState(isLoginSelector)
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const data = await fetchIsLogin()
      if (data.isSuccess) setIsLogin(true)
    })()
  }, [fetchIsLogin, setIsLogin])

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
