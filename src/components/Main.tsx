import { FC } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { notificationCountSelector } from '../recoil/global'
import { testAtom } from '../recoil/main'

const Main: FC = () => {
  const [notificationCount, setNotificationCount] = useRecoilState(
    notificationCountSelector
  )
  const test = useRecoilValue(testAtom)

  return (
    <main className="flex flex-col justify-center items-start h-[86vh]">
      logined:{test}
      <button onClick={() => setNotificationCount(notificationCount + 1)}>
        notification count up
      </button>
      <button onClick={() => setNotificationCount(0)}>
        notification count clear
      </button>
    </main>
  )
}

export default Main
