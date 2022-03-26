import { FC, memo, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isLoginSelector, userAtom } from '../recoil/global'
import { notificationCountAtom } from '../recoil/notification'
import { useNavigate } from 'react-router-dom'
import { BellIcon, LogoutIcon } from '@heroicons/react/outline'
import SignOutModal from './modal/SignOutModal'

const Header: FC = memo(() => {
  const [isLogin] = useRecoilState(isLoginSelector)
  const notificationCount = useRecoilValue(notificationCountAtom)
  const user = useRecoilValue(userAtom)
  const navigate = useNavigate()
  const [modalOn, setModalOn] = useState(false)

  return (
    <header className="flex flex-row item-center border-b-[1px]">
      <div className="flex justify-between w-screen text-xl">
        <div className=" m-3">
          <span
            className="hover:cursor-pointer"
            onClick={() => navigate('/')}
            data-testid="header"
          >
            Header{isLogin ? ':' + user.nickname : null}
          </span>
        </div>
        {isLogin ? (
          <>
            <div className="m-3 flex items-center">
              <BellIcon
                className="h-8 w-8 mr-3 hover:cursor-pointer"
                onClick={() => navigate('/notification')}
              />
              {notificationCount === 0 ? null : (
                <span className="absolute inline-block text-[5px] top-[10px] right-[55px] bg-red-500 text-white rounded-full text-center h-[12px] w-[12px] leading-[12px]">
                  {notificationCount}
                </span>
              )}
              <LogoutIcon
                className="h-8 w-8 hover:cursor-pointer"
                onClick={async () => {
                  setModalOn(true)
                }}
              />
              {modalOn ? <SignOutModal setModalOn={setModalOn} /> : null}
            </div>
          </>
        ) : null}
      </div>
    </header>
  )
})

export default Header
