import { render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import { Suspense } from 'react'
import Header from '../components/Header'

const Fallback = () => {
  return <div>Loading...</div>
}

describe('', () => {
  it('', () => {
    render(
      <RecoilRoot>
        <Suspense fallback={<Fallback />}>
          <Header />
        </Suspense>
      </RecoilRoot>
    )
    screen.debug()
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
