import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  isLoginSelector,
  userSelector,
  csrfTokenSelector,
} from '../recoil/global'
import { useSignIn } from '../hooks/useSignIn'

const SignIn = () => {
  const navigate = useNavigate()
  const csrfToken = useRecoilValue(csrfTokenSelector)
  const [isLogin, setIsLogin] = useRecoilState(isLoginSelector)
  const [user, setUser] = useRecoilState(userSelector)
  const { fetchPostSignIn } = useSignIn()

  useEffect(() => {
    if (isLogin) navigate('/')
  }, [isLogin, navigate])

  console.log('signin csrfToken:', csrfToken)
  return (
    <div>
      <input
        type="email"
        value={user.email}
        placeholder="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="password"
        value={user.password}
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        onClick={async (e) => {
          e.preventDefault()
          // TODO 型
          const res: any = await fetchPostSignIn(csrfToken, user)
          if (res.status === 200) setIsLogin(true)
        }}
      >
        ログイン
      </button>
    </div>
  )
}

export default SignIn
