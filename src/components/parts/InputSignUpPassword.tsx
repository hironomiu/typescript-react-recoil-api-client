import { memo } from 'react'

type PROPS = {
  user: { nickname: string; email: string; password: string }
  setUser: React.Dispatch<
    React.SetStateAction<{ nickname: string; email: string; password: string }>
  >
}
const InputSignUpPassword = memo((props: PROPS) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      props.setUser({ ...props.user, password: e.target.value })
    }
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="">Password</label>
      <input
        className="w-64 bg-gray-100 rounded border-[1px] border-gray-300 py-1 my-1 px-3"
        type="password"
        placeholder="password"
        onChange={handleChange}
        value={props.user.password}
      />
    </div>
  )
})

export default InputSignUpPassword
