// use useAuth
export type SignInUser = {
  email: string
  password: string
}

// use useAuth inputSignUpEmail
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

// use useLayout
export type ResFetchGetNotificationData = {
  id: number
  title: string
  notification: string
  is_confirmed: boolean
}
// use useLayout
export type ResFetchGetNotification = {
  data: ResFetchGetNotificationData[]
  isSuccess: boolean
  message: string
}
