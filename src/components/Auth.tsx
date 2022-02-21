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

type SignUpUser = {
  email: string
  password: string
}
const Auth = () => {
  const navigate = useNavigate()
  const csrfToken = useRecoilValue(csrfTokenSelector)
  const [isLogin, setIsLogin] = useRecoilState(isLoginSelector)
  const [user, setUser] = useRecoilState(userSelector)
  const [signUpUser, setSignUpUser] = useState<SignUpUser>({
    email: '',
    password: '',
  })
  // TODO 型
  const { fetchPostSignIn }: any = useAuth()

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
          {/* TODO SignInで使ってるuserで使い回さず別途Stateを用意する */}
          <InputEmail user={signUpUser} setUser={setSignUpUser} />
          <InputPassword user={signUpUser} setUser={setSignUpUser} />
          <button className="bg-gray-400 px-3 py-1 my-1 rounded disabled:bg-gray-100 disabled:text-gray-200 w-64 mt-2">
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
