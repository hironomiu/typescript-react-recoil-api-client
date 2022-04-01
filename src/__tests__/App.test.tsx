process.env.REACT_APP_API_URL = 'http://localhost:5550'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from '../App'
import userEvent from '@testing-library/user-event'

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
  rest.get('http://localhost:5550/api/v1/auth/signin', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        isSuccess: false,
        message: 'not login',
      })
    )
  }),
  rest.get('http://localhost:5550/api/v1/csrf-token', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        csrfToken: 'token',
      })
    )
  }),
]
const server = setupServer(...handlers)

beforeEach(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

describe('App', () => {
  it('Appの表示（未SigIn）からSignUpへ遷移しSignInに戻る', async () => {
    render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    )
    expect(await screen.findByText('Loading...')).toBeInTheDocument()
    expect(await screen.findAllByText('SignIn')).toBeTruthy()
    userEvent.click(screen.getByTestId('span-q-signup'))
    expect(await screen.findAllByText('SignUp')).toBeTruthy()
    userEvent.click(screen.getByTestId('span-q-signin'))
    expect(await screen.findAllByText('SignIn')).toBeTruthy()
  })
  // TODO E2Eなのでちょっと考える
  it('Signin', async () => {
    render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    )
    expect(screen.getByText('Super Web Site!!')).toBeInTheDocument()
    expect(await screen.findAllByText('SignIn')).toBeTruthy()
    userEvent.type(screen.getByTestId('input-signin-email'), 'taro@example.com')
    userEvent.type(screen.getByTestId('input-signin-password'), 'password')
    userEvent.click(screen.getByTestId('button-signin'))
    // 太郎は表示されず（上の通りE2Eなので考える）
    expect(await screen.findByText('Super Web Site!!')).toBeInTheDocument()
    // screen.debug()
  })
})
