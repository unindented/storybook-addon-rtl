import React from 'react'
import {mount} from 'enzyme'
import RTLToggle from '.'

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
      wrapper.find('input').simulate('change', {target: {checked: true}})
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
