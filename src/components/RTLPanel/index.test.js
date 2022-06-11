import { render } from '@testing-library/react'
import React from 'react'
import RTLPanel from '.'

describe('RTLPanel', () => {
  let spy
  let wrapper

  beforeEach(() => {
    spy = jest.fn()
    wrapper = render(<RTLPanel checked onChange={spy} />)
  })

  it('renders', () => {
    expect(wrapper.container.firstChild).toMatchSnapshot()
  })
})
