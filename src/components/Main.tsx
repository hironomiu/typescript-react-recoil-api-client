import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { testAtom } from '../recoil/main'

const Main: FC = () => {
  const test = useRecoilValue(testAtom)

  return <div className="h-[90vh]">logined:{test}</div>
}

export default Main
