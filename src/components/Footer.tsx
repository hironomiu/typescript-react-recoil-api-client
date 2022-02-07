import { FC, memo } from 'react'

const Footer: FC = memo(() => {
  return (
    <footer className="flex justify-center text-xl border-t-[1px] w-screen">
      <div className="m-3">
        <span>Footer@2022</span>
      </div>
    </footer>
  )
})

export default Footer
