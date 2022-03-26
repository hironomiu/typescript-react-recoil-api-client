import React from 'react'
import { SignUpUser } from '../../types'

const InputSignUpEmail = (props: {
  user: SignUpUser
  setUser: React.Dispatch<React.SetStateAction<SignUpUser>>
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setUser({ ...props.user, email: e.target.value })
  }
  return (
    <div className="flex flex-col">
      <label htmlFor="">Email</label>
      <input
        className="w-64 rounded border-[1px] py-1 px-3 my-1 border-gray-300 bg-gray-100"
        type="email"
        placeholder="email"
        onChange={handleChange}
        value={props.user.email}
      />
    </div>
  )
}

export default InputSignUpEmail
