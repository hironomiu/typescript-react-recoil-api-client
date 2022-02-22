import React from 'react'

const InputSignUpPassword = (props: any) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="">Password</label>
      <input
        className="w-64 bg-gray-100 rounded border-[1px] border-gray-300 py-1 my-1 px-3"
        type="password"
        placeholder="password"
      />
    </div>
  )
}

export default InputSignUpPassword
