import { atom, selector } from 'recoil'

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
