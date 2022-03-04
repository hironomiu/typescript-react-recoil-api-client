import { render, screen } from '@testing-library/react'

describe('', () => {
  it('', () => {
    render(<div data-testid="hello">hello</div>)
    expect(screen.getByTestId('hello').textContent).toBe('hello')
  })
})
