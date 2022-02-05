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
  const [isLogin, setIsLogin] = useRecoilState<boolean>(isLoginSelector)

  const { fetchIsLogin, fetchGetSignOut, fetchPostSignIn } = useMain()

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
            const data = await fetchGetSignOut(csrfToken)
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

export default Main
