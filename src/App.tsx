import { Routes, Route } from 'react-router-dom'
import Main from './components/Main'
import Layout from './components/Layout'
import SignIn from './components/SignIn'
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
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Main />}></Route>
              <Route path="/signin" element={<SignIn />}></Route>
            </Route>
          </Routes>
        </Suspense>
      </RecoilRoot>
    </div>
  )
}

export default App
