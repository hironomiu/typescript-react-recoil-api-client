import { FC } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { csrfTokenSelector, isLoginSelector } from '../recoil/global'
import { testAtom } from '../recoil/main'
import { useMain } from '../hooks/useMain'

const Main: FC = () => {
  const test = useRecoilValue(testAtom)
  const csrfToken = useRecoilValue(csrfTokenSelector)
  const [, setIsLogin] = useRecoilState<boolean>(isLoginSelector)
  const { fetchGetSignOut } = useMain()

  return (
    <div>
      logined:{test}
      <button
        onClick={async (e) => {
          e.preventDefault()
          const data = await fetchGetSignOut(csrfToken)
          if (data.isSuccess) setIsLogin(false)
        }}
      >
        Logout
      </button>
    </div>
  )
}

export default Main
