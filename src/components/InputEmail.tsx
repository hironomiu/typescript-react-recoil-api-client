import { FC, memo } from 'react'
import { SetterOrUpdater } from 'recoil'

type PROPS = {
  user: {
    email: string
    password: string
  }
  setUser: SetterOrUpdater<{
    email: string
    password: string
  }>
}

const InputEmail = memo((props: PROPS) => {
  return (
    <input
      type="email"
      value={props.user.email}
      placeholder="email"
      onChange={(e) => props.setUser({ ...props.user, email: e.target.value })}
    />
  )
})

export default InputEmail
