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

const InputEmail = memo((props: PROPS) => {
  // TODO 型
  const handleChange = (e: any) => {
    props.setUser({ ...props.user, email: e.target.value })
  }
  return (
    <div className="flex flex-col">
      <label htmlFor="">Email</label>
      <input
        type="email"
        value={props.user.email}
        placeholder="email"
        onChange={handleChange}
        className="bg-gray-100 rounded px-3 py-1 my-1 w-64 border-[1px] border-gray-300"
      />
    </div>
  )
})

export default InputEmail
