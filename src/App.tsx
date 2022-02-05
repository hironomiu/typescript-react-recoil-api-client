import { Suspense } from 'react'
import { atom, RecoilRoot, selector } from 'recoil'
import Main from './components/Main'

export const userAtom = atom({
  key: 'userAtom',
  default: { email: 'taro@example.com', password: 'password' },
})

export const userEmailSelector = selector<{ email: string; password: string }>({
  key: 'userSelector',
  get: ({ get }) => {
    const user = get(userAtom)
    return user
  },
  set: ({ set }, newValue) => {
    set(userAtom, newValue)
  },
})

export const csrfTokenAtom = atom({
  key: 'csrfTokenAtom',
  default: '',
})

export const csrfTokenSelector = selector<string>({
  key: 'csrfTokenSelector',
  get: async ({ get }) => {
    const csrfToken = get(csrfTokenAtom)
    if (csrfToken === '') {
      const res = await fetch(
        'https://localhost.hironomiu.com/api/v1/csrf-token'
      )
      const data = await res.json()
      return data.csrfToken
    }
    return csrfToken
  },
  // set: ({ set }, newValue) => {
  //   console.log(newValue)
  //   set(csrfTokenAtom, newValue)
  // },
})

export const isLoginAtom = atom({
  key: 'isLoginAtom',
  default: false,
})

export const isLoginSelector = selector<boolean>({
  key: 'isLoginSelector',
  get: ({ get }) => {
    const isLogin = get(isLoginAtom)
    return isLogin
  },
  set: ({ set }, newValue) => {
    set(isLoginAtom, newValue)
  },
})

const Fallback = () => {
  return <div>Loading...</div>
}

const App = () => {
  return (
    <div>
      <RecoilRoot>
        <Suspense fallback={<Fallback />}>
          <Main />
        </Suspense>
      </RecoilRoot>
    </div>
  )
}

export default App
