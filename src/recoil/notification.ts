import { atom, selector } from 'recoil'

export const notificationCountAtom = atom<number>({
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

type Notification = {
  isSuccess: boolean
  message: string
  data: { title: string; notification: string; is_confirmed: boolean }[]
}

export const notificationAtom = atom<Notification>({
  key: 'notificationAtom',
  default: {
    isSuccess: true,
    message: 'test',
    data: [{ title: '', notification: '', is_confirmed: false }],
  },
})

export const notificationSelector = selector<Notification>({
  key: 'notificationSelector',
  get: ({ get }) => {
    const notification = get(notificationAtom)
    return notification
  },
  set: ({ set }, newValue) => {
    set(notificationAtom, newValue)
  },
})
