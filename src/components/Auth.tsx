import { useEffect, useState } from 'react'
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

const Auth = () => {
  const navigate = useNavigate()
  const csrfToken = useRecoilValue(csrfTokenSelector)
  const [isLogin, setIsLogin] = useRecoilState(isLoginSelector)
  const [user, setUser] = useRecoilState(userSelector)
  const { fetchPostSignIn } = useSignIn()

  // useStateだがRoutingする時はRecoilで管理させる
  const [isSignIn, setIsSignIn] = useState(true)

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
    <main className="flex flex-col h-[90vh] items-center justify-center">
      {isSignIn ? (
        <>
          <h1 className="text-2xl">SignIn</h1>
          <InputEmail user={user} setUser={setUser} />
          <InputPassword user={user} setUser={setUser} />
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              handleClick(e)
            }}
            disabled={user.email && user.password ? false : true}
            className="bg-gray-400 px-3 py-1 my-1 rounded disabled:bg-gray-100 disabled:text-gray-200"
          >
            SignIn
          </button>
          <span
            className="border-b-[1px] border-black"
            onClick={() => setIsSignIn(false)}
          >
            SignUp?
          </span>
        </>
      ) : (
        <>
          <h1 className="text-2xl">SignUp</h1>
          {/* TODO SignInで使ってるuserで使い回さず別途Stateを用意する */}
          <InputEmail user={user} setUser={setUser} />
          <InputPassword user={user} setUser={setUser} />
          <button className="bg-gray-400 px-3 py-1 my-1 rounded disabled:bg-gray-100 disabled:text-gray-200">
            SignUp
          </button>
          <span
            className="border-b-[1px] border-black"
            onClick={() => setIsSignIn(true)}
          >
            SignIn?
          </span>
        </>
      )}
    </main>
  )
}

export default Auth
