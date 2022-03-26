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

// use useLayout recoil/notification
export type NotificationData = {
  id: number
  title: string
  notification: string
  is_confirmed: boolean
}

// use useLayout recoil/notification
export type Notification = {
  isSuccess: boolean
  message: string
  data: NotificationData[]
}
