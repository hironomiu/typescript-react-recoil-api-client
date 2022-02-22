import React from 'react'

const InputSignUpEmail = (props: any) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="">Email</label>
      <input
        className="w-64 rounded border-[1px] py-1 px-3 my-1 border-gray-300 bg-gray-100"
        type="email"
        placeholder="email"
      />
    </div>
  )
}

export default InputSignUpEmail
