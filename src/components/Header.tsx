import { FC } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isLoginSelector, csrfTokenSelector } from '../recoil/global'
import { useHeader } from '../hooks/useHeader'
const Header: FC = () => {
  const [isLogin, setIsLogin] = useRecoilState(isLoginSelector)
  const csrfToken = useRecoilValue(csrfTokenSelector)
  const { fetchGetSignOut } = useHeader()

  return (
    <header className="flex flex-row item-center">
      <div className="flex justify-between w-screen text-xl">
        <div className=" mx-3">
          <span>Header</span>
        </div>
        <div className="mx-3">
          {isLogin ? (
            <span
              onClick={async (e) => {
                e.preventDefault()
                const data = await fetchGetSignOut(csrfToken)
                if (data.isSuccess) setIsLogin(false)
              }}
            >
              Logout
            </span>
          ) : null}
        </div>
      </div>
    </header>
  )
}

export default Header
