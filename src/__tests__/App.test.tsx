process.env.REACT_APP_API_URL = 'http://localhost:5550'
import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders learn react link', () => {
  render(<App />)
  screen.debug()
  const linkElement = screen.getByText(/Header/i)
  expect(linkElement).toBeInTheDocument()
})
