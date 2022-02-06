const API_URL = process.env.REACT_APP_API_URL

export const useMain = () => {
  const fetchGetSignOut = async (csrfToken: string) => {
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
    return data
  }
  return { fetchGetSignOut }
}
