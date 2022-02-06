const API_URL = new URL('/', process.env.REACT_APP_API_URL)

export const useMain = () => {
  console.log(API_URL)
  const fetchGetSignOut = async (csrfToken: string) => {
    const res = await fetch(
      new URL('api/v1/auth/signout', API_URL).toString(),
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken,
        },
      }
    )
    const data = await res.json()
    return data
  }
  return { fetchGetSignOut }
}
