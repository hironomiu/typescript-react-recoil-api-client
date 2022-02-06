import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { isLoginAtom } from '../recoil/global'

const Header: FC = () => {
  const isLogin = useRecoilValue(isLoginAtom)

  return (
    <div>
      Header
      {isLogin ? <span>Logout?</span> : null}
    </div>
  )
}

export default Header
