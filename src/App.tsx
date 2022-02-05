import { Suspense } from 'react'
import { RecoilRoot } from 'recoil'
import Main from './components/Main'

const Fallback = () => {
  return <div>Loading...</div>
}

const App = () => {
  return (
    <div>
      <RecoilRoot>
        <Suspense fallback={<Fallback />}>
          <Main />
        </Suspense>
      </RecoilRoot>
    </div>
  )
}

export default App
