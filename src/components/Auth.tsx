import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  isLoginSelector,
  userSelector,
  csrfTokenSelector,
} from '../recoil/global'
import { useAuth } from '../hooks/useAuth'
import InputSignInEmail from './parts/InputSignInEmail'
import InputSignInPassword from './parts/InputSignInPassword'
import ErrorMessageModal from './modal/ErrorMessageModal'
import InputSignUpNickName from './parts/InputSignUpNickName'
import InputSignUpEmail from './parts/InputSignUpEmail'
import InputSignUpPassword from './parts/InputSignUpPassword'
import {
  SignInUser,
  SignUpUser,
  ResFetchPostSignIn,
  ResFetchPostSignUp,
} from '../types'

const Auth = () => {
  const navigate = useNavigate()
  const csrfToken = useRecoilValue(csrfTokenSelector)
  const [isLogin, setIsLogin] = useRecoilState(isLoginSelector)
  const [, setUser] = useRecoilState(userSelector)

  const {
    signInUser,
    setSignInUser,
    signUpUser,
    setSignUpUser,
    fetchPostSignIn,
    fetchPostSignUp,
  }: {
    signInUser: SignInUser
    setSignInUser: React.Dispatch<React.SetStateAction<SignInUser>>
    signUpUser: SignUpUser
    setSignUpUser: React.Dispatch<React.SetStateAction<SignUpUser>>
    fetchPostSignIn: (
      csrfToken: string,
      user: SignInUser
    ) => Promise<ResFetchPostSignIn> | void
    fetchPostSignUp: (
      csrfToken: string,
      user: SignInUser
    ) => Promise<ResFetchPostSignUp> | void
  } = useAuth()

  // useStateだがRoutingする時はRecoilで管理させる
  const [isSignIn, setIsSignIn] = useState(true)
  const [modalOn, setModalOn] = useState<boolean>(false)

  useEffect(() => {
    if (isLogin) navigate('/')
  }, [isLogin, navigate])

  const signInhandleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    const res = await fetchPostSignIn(csrfToken, signInUser)
    if (res?.isSuccess) {
      setIsLogin(true)
      setUser({ nickname: res.nickname, email: res.email })
    } else setModalOn(true)
  }

  const signUpHandleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    const res = await fetchPostSignUp(csrfToken, signUpUser)
    if (!res?.isSuccess) setModalOn(true)
    console.log('signup:', res)
  }

  const handleTrue = () => setIsSignIn(true)
  const handleFalse = () => setIsSignIn(false)

  return (
    <main className="flex flex-col h-[86vh] items-center justify-center">
      {isSignIn ? (
        <>
          {modalOn ? (
            <ErrorMessageModal message="SignIn Error" setModalOn={setModalOn} />
          ) : null}
          <h1 className="text-2xl">SignIn</h1>
          <InputSignInEmail user={signInUser} setUser={setSignInUser} />
          <InputSignInPassword user={signInUser} setUser={setSignInUser} />
          <button
            onClick={signInhandleClick}
            data-testid="button-signin"
            disabled={signInUser.email && signInUser.password ? false : true}
            className="bg-gray-400 px-3 py-1 my-1 rounded disabled:bg-gray-100 disabled:text-gray-200 w-64 mt-2"
          >
            SignIn
          </button>
          <span
            className="border-b-[1px] border-black mt-2 hover:cursor-pointer"
            onClick={handleFalse}
            data-testid="span-q-signup"
          >
            SignUp?
          </span>
        </>
      ) : (
        <>
          {modalOn ? (
            <ErrorMessageModal message="SignUp Error" setModalOn={setModalOn} />
          ) : null}
          <h1 className="text-2xl">SignUp</h1>
          <InputSignUpNickName user={signUpUser} setUser={setSignUpUser} />
          <InputSignUpEmail user={signUpUser} setUser={setSignUpUser} />
          <InputSignUpPassword user={signUpUser} setUser={setSignUpUser} />
          <button
            onClick={signUpHandleClick}
            disabled={
              signUpUser.nickname && signUpUser.email && signUpUser.password
                ? false
                : true
            }
            className="bg-gray-400 px-3 py-1 my-1 rounded disabled:bg-gray-100 disabled:text-gray-200 w-64 mt-2"
          >
            SignUp
          </button>
          <span
            className="border-b-[1px] border-black mt-2 hover:cursor-pointer"
            onClick={handleTrue}
            data-testid="span-q-signin"
          >
            SignIn?
          </span>
        </>
      )}
    </main>
  )
}

export default Auth
