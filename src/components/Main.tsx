import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { testAtom } from '../recoil/main'

const Main: FC = () => {
  const test = useRecoilValue(testAtom)

  return (
    <main className="flex flex-col justify-center h-[90vh]">
      logined:{test}
    </main>
  )
}

export default Main
