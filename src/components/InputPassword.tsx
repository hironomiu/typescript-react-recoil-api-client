import React from 'react'

// TODO 型
const InputPassword = (props: any) => {
  return (
    <input
      type="password"
      value={props.user.password}
      placeholder="password"
      onChange={(e) =>
        props.setUser({ ...props.user, password: e.target.value })
      }
    />
  )
}

export default InputPassword
