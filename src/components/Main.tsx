import { FC, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import {
  userAtom,
  userEmailSelector,
  csrfTokenSelector,
  isLoginSelector,
} from '../App'

const Main: FC = () => {
  const [user, setUser] = useRecoilState(userEmailSelector)
  const [csrfToken, setCsrfToken] = useRecoilState(csrfTokenSelector)
  const [isLogin, setIsLogin] = useRecoilState(isLoginSelector)

  useEffect(() => {
    ;(async () => {
      const res = await fetch(
        'https://localhost.hironomiu.com/api/v1/csrf-token'
      )
      const data = await res.json()
      setCsrfToken(data.csrfToken)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const res = await fetch(
        'https://localhost.hironomiu.com/api/v1/auth/signin'
      )
      const data = await res.json()
      if (data.isSuccess) setIsLogin(true)
      console.log(data)
    })()
  }, [])
  if (isLogin) {
    return (
      <div>
        logined
        <button
          onClick={async (e) => {
            e.preventDefault()
            const res = await fetch(
              'https://localhost.hironomiu.com/api/v1/auth/signout',
              {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                redirect: 'follow',
                headers: {
                  'Content-Type': 'application/json',
                  'CSRF-Token': csrfToken,
                },
              }
            )
            const data = await res.json()
            if (data.isSuccess) setIsLogin(false)
          }}
        >
          Logout
        </button>
      </div>
    )
  }

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
          const res = await fetch(
            'https://localhost.hironomiu.com/api/v1/auth/signin',
            {
              method: 'POST',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'include',
              redirect: 'follow',
              headers: {
                'Content-Type': 'application/json',
                'CSRF-Token': csrfToken,
              },
              body: JSON.stringify({ ...user }),
            }
          )
          // TODO ログインの判定
          setIsLogin(true)
          console.log(res)
        }}
      >
        ログイン
      </button>
    </div>
  )
}

export default Main
