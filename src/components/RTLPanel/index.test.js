import React from 'react'
import { shallow, configure } from 'enzyme'
import RTLPanel from '.'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

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
