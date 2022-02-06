import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  isLoginSelector,
  userSelector,
  csrfTokenSelector,
} from '../recoil/global'
import { useSignIn } from '../hooks/useSignIn'
import InputEmail from './InputEmail'
import InputPassword from './InputPassword'

const SignIn = () => {
  const navigate = useNavigate()
  const csrfToken = useRecoilValue(csrfTokenSelector)
  const [isLogin, setIsLogin] = useRecoilState(isLoginSelector)
  const [user, setUser] = useRecoilState(userSelector)
  const { fetchPostSignIn } = useSignIn()

  useEffect(() => {
    if (isLogin) navigate('/')
  }, [isLogin, navigate])

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    const res = await fetchPostSignIn(csrfToken, user)
    if (res.status === 200) setIsLogin(true)
  }

  return (
    <div>
      <InputEmail user={user} setUser={setUser} />
      <InputPassword user={user} setUser={setUser} />
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          handleClick(e)
        }}
      >
        ログイン
      </button>
    </div>
  )
}

export default SignIn
