import { useCallback } from 'react'
const FETCH_GET_SIGNOUT_PATH = '/api/v1/auth/signout'
const API_URL = new URL(FETCH_GET_SIGNOUT_PATH, process.env.REACT_APP_API_URL)

export const useHeader = () => {
  const fetchGetSignOut = useCallback(async (csrfToken: string) => {
    const res = await fetch(API_URL.toString(), {
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
    return data
  }, [])
  return { fetchGetSignOut }
}
