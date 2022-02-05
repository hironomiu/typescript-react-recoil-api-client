const API_URL = process.env.REACT_APP_API_URL

export const useSignIn = () => {
  type User = {
    email: string
    password: string
  }

  const fetchPostSignIn = async (csrfToken: string, user: User) => {
    // TODO 型
    console.log('csrfToken:', csrfToken)
    const res: any = await fetch(API_URL + '/api/v1/auth/signin', {
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
  }
  return { fetchPostSignIn }
}
