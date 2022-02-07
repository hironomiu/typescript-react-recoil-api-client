import { memo } from 'react'
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
const InputPassword = memo((props: PROPS) => {
  return (
    <input
      type="password"
      value={props.user.password}
      placeholder="password"
      onChange={(e) =>
        props.setUser({ ...props.user, password: e.target.value })
      }
      className="bg-gray-200 rounded px-3 py-1 my-1"
    />
  )
})

export default InputPassword
