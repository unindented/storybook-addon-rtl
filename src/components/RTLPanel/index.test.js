import React from 'react'
import {shallow} from 'enzyme'
import RTLPanel from '.'

describe('RTLPanel', () => {
  let spy
  let wrapper

  beforeEach(() => {
    spy = jest.fn()
    wrapper = shallow(<RTLPanel checked onChange={spy} />)
  })

  it('renders', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
