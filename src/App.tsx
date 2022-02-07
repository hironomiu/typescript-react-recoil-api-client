import { Routes, Route } from 'react-router-dom'
import Main from './components/Main'
import Layout from './components/Layout'
import Auth from './components/Auth'
import Notification from './components/Notification'
import { Suspense } from 'react'
import { RecoilRoot } from 'recoil'

const App = () => {
  const Fallback = () => {
    return <div>Loading...</div>
  }

  return (
    <>
      <RecoilRoot>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Main />}></Route>
              <Route path="notification" element={<Notification />}></Route>
              <Route path="/auth" element={<Auth />}></Route>
            </Route>
          </Routes>
        </Suspense>
      </RecoilRoot>
    </>
  )
}

export default App
