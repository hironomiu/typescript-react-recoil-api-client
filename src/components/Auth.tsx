import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  isLoginSelector,
  userSelector,
  csrfTokenSelector,
} from '../recoil/global'
import { useAuth } from '../hooks/useAuth'
import InputEmail from './parts/InputEmail'
import InputPassword from './parts/InputPassword'
import ErrorMessageModal from './modal/ErrorMessageModal'
import InputSignUpNickName from './parts/InputSignUpNickName'
import InputSignUpEmail from './parts/InputSignUpEmail'
import InputSignUpPassword from './parts/InputSignUpPassword'

type SignUpUser = {
  nickname: string
  email: string
  password: string
}
const Auth = () => {
  const navigate = useNavigate()
  const csrfToken = useRecoilValue(csrfTokenSelector)
  const [isLogin, setIsLogin] = useRecoilState(isLoginSelector)
  const [user, setUser] = useRecoilState(userSelector)
  const [signUpUser, setSignUpUser] = useState<SignUpUser>({
    nickname: '',
    email: '',
    password: '',
  })
  // TODO 型
  const { fetchPostSignIn, fetchPostSignUp }: any = useAuth()

  // useStateだがRoutingする時はRecoilで管理させる
  const [isSignIn, setIsSignIn] = useState(true)
  const [modalOn, setModalOn] = useState<boolean>(false)

  useEffect(() => {
    if (isLogin) navigate('/')
  }, [isLogin, navigate])

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    const res = await fetchPostSignIn(csrfToken, user)
    console.log(res)
    if (res.isSuccess === true) {
      setIsLogin(true)
    } else {
      setModalOn(true)
    }
  }

  const signUpHandleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    const res = await fetchPostSignUp(csrfToken, signUpUser)
    console.log('signup:', res)
  }
  return (
    <main className="flex flex-col h-[86vh] items-center justify-center">
      {isSignIn ? (
        <>
          {modalOn ? (
            <ErrorMessageModal message="SignIn Error" setModalOn={setModalOn} />
          ) : null}
          <h1 className="text-2xl">SignIn</h1>
          <InputEmail user={user} setUser={setUser} />
          <InputPassword user={user} setUser={setUser} />
          <button
            onClick={handleClick}
            disabled={user.email && user.password ? false : true}
            className="bg-gray-400 px-3 py-1 my-1 rounded disabled:bg-gray-100 disabled:text-gray-200 w-64 mt-2"
          >
            SignIn
          </button>
          <span
            className="border-b-[1px] border-black mt-2 hover:cursor-pointer"
            onClick={() => setIsSignIn(false)}
          >
            SignUp?
          </span>
        </>
      ) : (
        <>
          <h1 className="text-2xl">SignUp</h1>
          <InputSignUpNickName user={signUpUser} setUser={setSignUpUser} />
          <InputSignUpEmail user={signUpUser} setUser={setSignUpUser} />
          <InputSignUpPassword user={signUpUser} setUser={setSignUpUser} />
          <button
            // TODO SignUpの実装
            onClick={signUpHandleClick}
            disabled={signUpUser.email && signUpUser.password ? false : true}
            className="bg-gray-400 px-3 py-1 my-1 rounded disabled:bg-gray-100 disabled:text-gray-200 w-64 mt-2"
          >
            SignUp
          </button>
          <span
            className="border-b-[1px] border-black mt-2 hover:cursor-pointer"
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
