import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './components/Main'
import { Suspense } from 'react'
import { RecoilRoot } from 'recoil'

const App = () => {
  const Fallback = () => {
    return <div>Loading...</div>
  }

  return (
    <div>
      <RecoilRoot>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<Main />}></Route>
          </Routes>
        </Suspense>
      </RecoilRoot>
    </div>
  )
}

export default App
