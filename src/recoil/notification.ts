import { atom, selector } from 'recoil'
import { Notification } from '../types'

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

export const notificationAtom = atom<Notification>({
  key: 'notificationAtom',
  default: {
    isSuccess: true,
    message: 'test',
    data: [{ id: 0, title: '', notification: '', is_confirmed: false }],
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
