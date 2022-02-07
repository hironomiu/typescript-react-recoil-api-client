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
    <main className="flex flex-row justify-center items-start h-[86vh] w-screen">
      <div className="flex justify-center items-center  h-[86vh] w-[25vw] border-r-[1px]">
        div1
      </div>
      <div className="flex flex-col justify-center items-start h-[86vh] w-[75vw] ml-10">
        logined:{test}
        <button onClick={() => setNotificationCount(notificationCount + 1)}>
          notification count up
        </button>
        <button onClick={() => setNotificationCount(0)}>
          notification count clear
        </button>
      </div>
    </main>
  )
}

export default Main
