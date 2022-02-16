const FETCH_GET_NOTIFICATION = '/api/v1/notifications'
const API_URL = new URL(FETCH_GET_NOTIFICATION, process.env.REACT_APP_API_URL)

type NotificationData = {
  isSuccess: boolean
  message: string
  data: { title: string; notification: string; is_confirmed: boolean }[]
}

export const useNotification = () => {
  const fetchGetNotification = async () => {
    const res = await fetch(API_URL.toString(), {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
    })
    const data: Response = await res.json()
    return data
  }
  return { fetchGetNotification }
}
