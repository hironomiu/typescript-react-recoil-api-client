import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { RecoilRoot } from 'recoil'
import { Suspense } from 'react'
import Header from '../components/Header'

const Fallback = () => {
  return <div>Loading...</div>
}

describe('', () => {
  it('', async () => {
    render(
      <RecoilRoot>
        <Suspense fallback={<Fallback />}>
          <Header />
        </Suspense>
      </RecoilRoot>
    )

    await waitFor(() => {
      screen.getByText('Header')
    })
    expect(screen.getByTestId('header')).toBeInTheDocument()

    // TODO Suspenseを通す
    //   <body>
    //   <div>
    //     <div>
    //       Loading...
    //     </div>
    //   </div>
    //   </body>
  })
})
