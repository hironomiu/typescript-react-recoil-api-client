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

  // type User = {
  //   email: string
  //   password: string
  // }

  // const fetchPostSignIn = async (csrfToken: string, user: User) => {
  //   // TODO 型
  //   const res: any = await fetch(API_URL + '/api/v1/auth/signin', {
  //     method: 'POST',
  //     mode: 'cors',
  //     cache: 'no-cache',
  //     credentials: 'include',
  //     redirect: 'follow',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'CSRF-Token': csrfToken,
  //     },
  //     body: JSON.stringify({ ...user }),
  //   })
  //   return res
  // }
  return { fetchGetSignOut }
}
