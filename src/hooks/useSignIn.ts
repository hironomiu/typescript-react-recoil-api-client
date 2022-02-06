import { useCallback } from 'react'
const FETCH_POST_SIGNIN = '/api/v1/auth/signin'
const API_URL = new URL(FETCH_POST_SIGNIN, process.env.REACT_APP_API_URL)

export const useSignIn = () => {
  type User = {
    email: string
    password: string
  }

  const fetchPostSignIn = useCallback(async (csrfToken: string, user: User) => {
    const res = await fetch(API_URL.toString(), {
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
    return res
  }, [])
  return { fetchPostSignIn }
}
