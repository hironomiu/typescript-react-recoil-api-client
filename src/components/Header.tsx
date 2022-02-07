import { FC, memo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  isLoginSelector,
  csrfTokenSelector,
  notificationCountAtom,
} from '../recoil/global'
import { useNavigate } from 'react-router-dom'
import { useHeader } from '../hooks/useHeader'
import { BellIcon } from '@heroicons/react/outline'

const Header: FC = memo(() => {
  const [isLogin, setIsLogin] = useRecoilState(isLoginSelector)
  const notificationCount = useRecoilValue(notificationCountAtom)
  const csrfToken = useRecoilValue(csrfTokenSelector)
  const { fetchGetSignOut } = useHeader()
  const navigate = useNavigate()

  return (
    <header className="flex flex-row item-center border-b-[1px]">
      <div className="flex justify-between w-screen text-xl">
        <div className=" m-3">
          <span className="hover:cursor-pointer" onClick={() => navigate('/')}>
            Header
          </span>
        </div>
        <div className="m-3 flex items-center">
          {isLogin ? (
            <>
              <BellIcon
                className="h-6 w-6 mr-3 hover:cursor-pointer"
                onClick={() => navigate('/notification')}
              />
              {notificationCount === 0 ? null : (
                <span className=" absolute inline-block text-[5px] top-[10px] right-[83px] bg-red-500 text-white rounded-full text-center h-[12px] w-[12px] leading-[12px]">
                  {notificationCount}
                </span>
              )}
              <span
                className="hover:cursor-pointer"
                onClick={async (e) => {
                  e.preventDefault()
                  const data = await fetchGetSignOut(csrfToken)
                  if (data.isSuccess) setIsLogin(false)
                }}
              >
                Logout
              </span>
            </>
          ) : null}
        </div>
      </div>
    </header>
  )
})

export default Header
