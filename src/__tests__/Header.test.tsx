import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { RecoilRoot, SetRecoilState } from 'recoil'
import { Suspense } from 'react'
import Header from '../components/Header'
import { BrowserRouter } from 'react-router-dom'
import { isLoginAtom } from '../recoil/global'
import { notificationCountAtom } from '../recoil/notification'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// TODO mswでspan-notification-countをコントロールしたい（今はrecoilに初期値を設定してテストしている（これはこれで問題ないが））
// const handlers = [
//   rest.get('http://localhost:5550/api/v1/notifications', (req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json([
//         {
//           id: 1,
//           title: 'dummy title',
//           notification: 'dummy notification',
//           is_confirmed: false,
//         },
//       ])
//     )
//   }),
// ]

// const server = setupServer(...handlers)

// beforeEach(() => {
//   server.listen()
// })

// afterEach(() => {
//   server.resetHandlers()
// })

// afterAll(() => {
//   server.close()
// })

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
      await screen.findByText('Super Web Site!!', undefined, {
        timeout: 1000,
      })
    ).toBeInTheDocument()
  })
  it('モックによりSignIn済み、ベルアイコンとログアウトアイコンが存在すること', async () => {
    const initializeState = ({ set }: { set: SetRecoilState }) => {
      set(isLoginAtom, true)
      set(notificationCountAtom, 3)
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
    expect(await screen.findByText('Super Web Site!!:')).toBeInTheDocument()
    expect(screen.getByTestId('bell-icon')).toBeTruthy()
    expect(screen.getByTestId('logout-icon')).toBeTruthy()
    expect(screen.getByTestId('span-notification-count')).toBeTruthy()
    expect(screen.getByTestId('span-notification-count')).toHaveTextContent('3')
  })
})
