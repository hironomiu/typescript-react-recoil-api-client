import React from 'react'

const InputSignUpNickName = (props: any) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="">NickName</label>
      <input
        type="text"
        className="bg-gray-100 rounded px-3 py-1 my-1 w-64 border-[1px] border-gray-300"
      />
    </div>
  )
}

export default InputSignUpNickName
