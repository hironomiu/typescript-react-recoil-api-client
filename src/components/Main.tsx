import { FC } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { notificationCountSelector } from '../recoil/notification'
import { testAtom } from '../recoil/main'

const Main: FC = () => {
  const [notificationCount, setNotificationCount] = useRecoilState(
    notificationCountSelector
  )
  const test = useRecoilValue(testAtom)

  return (
    <main className="flex flex-row h-[86vh] w-screen">
      <div className="flex justify-center items-center  h-[86vh] w-[25vw] border-r-[1px]">
        div1
      </div>
      <div className="flex flex-col justify-center items-center h-[86vh] w-[75vw]">
        <h1 className="text-2xl">logined:{test}</h1>
        <button
          className="w-[220px] bg-gray-100 my-1 rounded"
          onClick={() => setNotificationCount(notificationCount + 1)}
        >
          notification count up
        </button>
        <button
          className="w-[220px] bg-gray-100 my-1 rounded"
          onClick={() => setNotificationCount(0)}
        >
          notification count clear
        </button>
      </div>
    </main>
  )
}

export default Main
