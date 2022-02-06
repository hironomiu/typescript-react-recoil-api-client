import { useCallback } from 'react'
const FETCH_GET_IS_LOGIN = '/api/v1/auth/signin'
const API_URL = new URL(FETCH_GET_IS_LOGIN, process.env.REACT_APP_API_URL)

export const useLayout = () => {
  const fetchGetIsLogin = useCallback(async () => {
    const res = await fetch(API_URL.toString(), {
      method: 'GET',
      credentials: 'include',
    })
    const data = await res.json()
    return data
  }, [])
  return { fetchGetIsLogin }
}
