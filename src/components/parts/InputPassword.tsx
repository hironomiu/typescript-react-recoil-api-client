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
    <div className="flex flex-col">
      <label htmlFor="">Password</label>
      <input
        type="password"
        value={props.user.password}
        placeholder="password"
        onChange={(e) =>
          props.setUser({ ...props.user, password: e.target.value })
        }
        className="bg-gray-100 rounded px-3 py-1 my-1 w-64 border-[1px] border-gray-300"
      />
    </div>
  )
})

export default InputPassword
