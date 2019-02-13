import React from 'react'
import { mount, configure } from 'enzyme'
import RTLToggle from '.'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('RTLToggle', () => {
  let spy
  let wrapper

  beforeEach(() => {
    spy = jest.fn()
  })

  describe('default', () => {
    beforeEach(() => {
      wrapper = mount(<RTLToggle onChange={spy} />)
    })

    it('renders', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('invokes `onChange` when changed', () => {
      wrapper.find('input').simulate('change', { target: { checked: true } })
      expect(spy).toHaveBeenCalledWith(true)
    })
  })

  describe('unchecked', () => {
    beforeEach(() => {
      wrapper = mount(<RTLToggle checked={false} onChange={spy} />)
    })

    it('renders', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('checked', () => {
    beforeEach(() => {
      wrapper = mount(<RTLToggle checked onChange={spy} />)
    })

    it('renders', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
