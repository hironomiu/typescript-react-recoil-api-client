import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '../components/Footer'

describe('Footer', () => {
  it('getByText', () => {
    render(<Footer />)
    expect(screen.getByText('Footer@2022')).toBeInTheDocument()
  })
})
