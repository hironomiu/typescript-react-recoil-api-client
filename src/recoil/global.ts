import { atom, selector } from 'recoil'

const API_URL = process.env.REACT_APP_API_URL

export const userAtom = atom({
  key: 'userAtom',
  default: { email: 'taro@example.com', password: 'password' },
})

export const userSelector = selector<{ email: string; password: string }>({
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
      const res = await fetch(API_URL + '/api/v1/csrf-token', {
        method: 'GET',
        credentials: 'include',
      })
      const data = await res.json()
      return data.csrfToken
    }
    return csrfToken
  },
  set: ({ set }, newValue) => {
    set(csrfTokenAtom, newValue)
  },
})

export const isLoginAtom = atom({
  key: 'isLoginAtom',
  default: false,
})

export const isLoginSelector = selector<boolean>({
  key: 'isLoginSelector',
  get: async ({ get }) => {
    const isLogin = get(isLoginAtom)
    return isLogin
  },
  set: ({ set, get }, newValue) => {
    set(isLoginAtom, newValue)
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
})

export const notificationCountAtom = atom({
  key: 'notificationCountAtom',
  default: 0,
})

export const notificationCountSelector = selector<number>({
  key: 'notificationCountSelector',
  get: ({ get }) => {
    const notificationCount = get(notificationCountAtom)
    return notificationCount
  },
  set: ({ set }, newValue) => {
    set(notificationCountAtom, newValue)
  },
})
