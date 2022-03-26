// use useAuth
export type SignInUser = {
  email: string
  password: string
}

// use useAuth
export type SignUpUser = {
  nickname: string
  email: string
  password: string
}

// use useAuth Auth
export type ResFetchPostSignIn = {
  isSuccess: boolean
  nickname: string
  email: string
}

// use useAuth Auth
export type ResFetchPostSignUp = {
  isSuccess: boolean
  message: string
  insertId: number
}
