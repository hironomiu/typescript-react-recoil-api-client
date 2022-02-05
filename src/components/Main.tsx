import { FC, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userEmailSelector, csrfTokenSelector, isLoginSelector } from '../App'

const API_URL = process.env.REACT_APP_API_URL
const Main: FC = () => {
  const [user, setUser] = useRecoilState(userEmailSelector)
  // const [csrfToken, setCsrfToken] = useRecoilState(csrfTokenSelector)
  const csrfToken = useRecoilValue(csrfTokenSelector)
  const [isLogin, setIsLogin] = useRecoilState<boolean>(isLoginSelector)
  // const [csrfToken, setCsrfToken] = useState('')
  // useEffect(() => {
  //   ;(async () => {
  //     const res = await fetch(API_URL + '/api/v1/csrf-token', {
  //       method: 'GET',
  //       credentials: 'include',
  //     })
  //     const data = await res.json()
  //     console.log('csrfToken2:', data.csrfToken)
  //     setCsrfToken(data.csrfToken)
  //   })()
  // }, [])

  useEffect(() => {
    ;(async () => {
      const res = await fetch(API_URL + '/api/v1/auth/signin', {
        method: 'GET',
        credentials: 'include',
      })
      const data = await res.json()
      if (data.isSuccess) setIsLogin(true)
      console.log('data:', data)
    })()
  }, [])

  console.log('hoge', isLogin)

  if (isLogin) {
    return (
      <div>
        logined
        <button
          onClick={async (e) => {
            e.preventDefault()
            const res = await fetch(API_URL + '/api/v1/auth/signout', {
              method: 'POST',
              mode: 'cors',
              cache: 'no-cache',
              redirect: 'follow',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                'CSRF-Token': csrfToken,
              },
            })
            const data = await res.json()
            // if (data.isSuccess) setIsLogin(false)
            // setTimeout(() => setIsLogin(false), 0)
            setIsLogin(false)
            console.log(isLogin)
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
          console.log(csrfToken)
          const res = await fetch(API_URL + '/api/v1/auth/signin', {
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
          })
          if (res.status === 200) setIsLogin(true)
        }}
      >
        ログイン
      </button>
    </div>
  )
}

export default Main
