import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { RecoilRoot } from 'recoil'
import { Suspense } from 'react'
import Header from '../components/Header'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { BrowserRouter } from 'react-router-dom'

// TODO msw使う
const handlers = [
  rest.get(
    'http://localhost:5550/api/v1/auth/notifications',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            title: 'hoge',
            notification: 'fuga',
            is_confirmed: 0,
          },
        ])
      )
    }
  ),
]
const server = setupServer(...handlers)

const Fallback = () => {
  return <div>Loading...</div>
}

describe('', () => {
  it('', async () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <Suspense fallback={<Fallback />}>
            <Header />
          </Suspense>
        </RecoilRoot>
      </BrowserRouter>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(
      await screen.findByText('Header', undefined, {
        timeout: 1000,
      })
    ).toBeInTheDocument()
  })
})
