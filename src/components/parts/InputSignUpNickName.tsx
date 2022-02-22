import React from 'react'
// TODO 型
const InputSignUpNickName = (props: any) => {
  // TODO 型
  const handleChange = (e: any) => {
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
}

export default InputSignUpNickName
