import React from 'react'

// TODO 型
const InputEmail = (props: any) => {
  return (
    <input
      type="email"
      value={props.user.email}
      placeholder="email"
      onChange={(e) => props.setUser({ ...props.user, email: e.target.value })}
    />
  )
}

export default InputEmail
