const API_URL = process.env.REACT_APP_API_URL

export const useMain = () => {
  const fetchIsLogin = async () => {
    const res = await fetch(API_URL + '/api/v1/auth/signin', {
      method: 'GET',
      credentials: 'include',
    })
    const data = await res.json()
    return data
  }

  return { fetchIsLogin }
}
