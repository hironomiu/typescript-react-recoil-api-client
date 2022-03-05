import { useCallback, useState } from 'react'
import { SignUpUser, SignInUser } from '../types'

const FETCH_POST_SIGNIN = '/api/v1/auth/signin'
const SIGNIN_API_URL = new URL(FETCH_POST_SIGNIN, process.env.REACT_APP_API_URL)
const FETCH_POST_SIGNUP = '/api/v1/auth/signup'
const SIGNUP_API_URL = new URL(FETCH_POST_SIGNUP, process.env.REACT_APP_API_URL)

type ResData = {
  isSuccess: boolean
  nickname: string
  email: string
}
export const useAuth = () => {
  const [signInUser, setSignInUser] = useState<SignInUser>({
    email: 'taro@example.com',
    password: 'password',
  })
  const [signUpUser, setSignUpUser] = useState<SignUpUser>({
    nickname: '',
    email: '',
    password: '',
  })
  try {
    const fetchPostSignIn = useCallback(
      async (csrfToken: string, user: SignInUser) => {
        const res = await fetch(SIGNIN_API_URL.toString(), {
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
        const data = (await res.json()) as ResData
        return data
      },
      []
    )

    const fetchPostSignUp = async (csrfToken: string, user: SignInUser) => {
      const res = await fetch(SIGNUP_API_URL.toString(), {
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
      const data = await res.json()
      return data
    }
    return {
      fetchPostSignIn,
      fetchPostSignUp,
      signInUser,
      setSignInUser,
      signUpUser,
      setSignUpUser,
    }
  } catch (err) {
    console.log(err)
    // TODO return
    return {
      fetchPostSignIn() {},
      fetchPostSignUp() {},
      signInUser,
      setSignInUser,
      signUpUser,
      setSignUpUser,
    }
    // return new Promise((resolve) => {
    //   resolve({ isSuccess: false })
    // })
  }

  //  TODO return
  // return new Promise((resolve) => resolve({ isSuccess: false }))
}
