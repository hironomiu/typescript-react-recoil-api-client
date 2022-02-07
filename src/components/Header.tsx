import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { isLoginAtom } from '../recoil/global'

const Header: FC = () => {
  const isLogin = useRecoilValue(isLoginAtom)

  return (
    <header className="flex flex-row item-center w-screen">
      <div className="flex justify-between">
        <div>
          <span className="text-sm">Header</span>
        </div>
        <div>{isLogin ? <span> Logout? </span> : <span> Login? </span>}</div>
      </div>
    </header>
  )
}

export default Header
