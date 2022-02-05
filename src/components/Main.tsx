import { FC, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  userEmailSelector,
  csrfTokenSelector,
  isLoginSelector,
} from '../recoil/global'

import { testAtom } from '../recoil/main'
import { useMain } from '../hooks/useMain'

const API_URL = process.env.REACT_APP_API_URL
const Main: FC = () => {
  const test = useRecoilValue(testAtom)
  const [user, setUser] = useRecoilState(userEmailSelector)
  const csrfToken = useRecoilValue(csrfTokenSelector)
  const { fetchIsLogin } = useMain()

  const [isLogin, setIsLogin] = useRecoilState<boolean>(isLoginSelector)
  useEffect(() => {
    ;(async () => {
      const data = await fetchIsLogin()
      if (data.isSuccess) setIsLogin(true)
      console.log(data)
    })()
  }, [])

  if (isLogin) {
    return (
      <div>
        logined:{test}
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
            setIsLogin(false)
            console.log(data)
            console.log('isLogin:', isLogin)
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
          console.log(res.status)
          if (res.status === 200) setIsLogin(true)
        }}
      >
        ログイン
      </button>
    </div>
  )
}

export default Main
