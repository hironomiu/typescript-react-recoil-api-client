import { memo } from 'react'

type PROPS = {
  user: { nickname: string; email: string; password: string }
  setUser: React.Dispatch<
    React.SetStateAction<{ nickname: string; email: string; password: string }>
  >
}

const InputSignUpNickName = memo((props: PROPS) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setUser({ ...props.user, nickname: e.target.value })
  }
  return (
    <div className="flex flex-col">
      <label htmlFor="">NickName</label>
      <input
        type="text"
        className="bg-gray-100 rounded px-3 py-1 my-1 w-64 border-[1px] border-gray-300"
        value={props.user.nickname}
        onChange={handleChange}
        placeholder="nickname"
      />
    </div>
  )
})

export default InputSignUpNickName
