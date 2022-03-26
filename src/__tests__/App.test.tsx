process.env.REACT_APP_API_URL = 'http://localhost:5550'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import App from '../App'

describe('App', () => {
  it('App', async () => {
    render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    )
    expect(await screen.findByText('Loading...')).toBeInTheDocument()
  })
})
// test('renders learn react link', () => {
//   render(<App />)
//   screen.debug()
//   const linkElement = screen.getByText(/Header/i)
//   expect(linkElement).toBeInTheDocument()
// })
