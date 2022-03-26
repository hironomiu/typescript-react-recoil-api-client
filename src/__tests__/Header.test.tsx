import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { RecoilRoot } from 'recoil'
import { Suspense } from 'react'
import Header from '../components/Header'
import { BrowserRouter } from 'react-router-dom'
import { isLoginAtom } from '../recoil/global'

const Fallback = () => {
  return <div>Loading...</div>
}

describe('Header', () => {
  it('未SignIn時のHeaderの表示、Suspenseをラップする必要があるため`Loading...`後に表示', async () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <Suspense fallback={<Fallback />}>
            <Header />
          </Suspense>
        </RecoilRoot>
      </BrowserRouter>
    )

    expect(await screen.findByText('Loading...')).toBeInTheDocument()
    expect(
      await screen.findByText('Header', undefined, {
        timeout: 1000,
      })
    ).toBeInTheDocument()
  })
  it('SignIn済み', async () => {
    const initializeState = ({ set }: any) => {
      set(isLoginAtom, true)
    }
    render(
      <BrowserRouter>
        <RecoilRoot initializeState={initializeState}>
          <Suspense fallback={<Fallback />}>
            <Header />
          </Suspense>
        </RecoilRoot>
      </BrowserRouter>
    )
    expect(await screen.findByText('Header:')).toBeInTheDocument()
  })
})
