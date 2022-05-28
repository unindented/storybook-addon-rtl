import React from 'react'
import { fireEvent, render, act } from '@testing-library/react'
import RTLToggle from '.'

describe('RTLToggle', () => {
  let spy
  let wrapper

  beforeEach(() => {
    spy = jest.fn()
  })

  describe('default', () => {
    beforeEach(() => {
      wrapper = render(<RTLToggle onChange={spy} />)
    })

    it('renders', () => {
      expect(wrapper.container.firstChild).toMatchSnapshot()
    })

    it('invokes `onChange` when changed', () => {
      act(() => {
        fireEvent.click(wrapper.getByTestId('rtl-toggle-input'))
      })
      expect(spy).toHaveBeenCalledWith(true)
    })
  })

  describe('unchecked', () => {
    beforeEach(() => {
      wrapper = render(<RTLToggle checked={false} onChange={spy} />)
    })

    it('renders', () => {
      expect(wrapper.container.firstChild).toMatchSnapshot()
    })
  })

  describe('checked', () => {
    beforeEach(() => {
      wrapper = render(<RTLToggle checked onChange={spy} />)
    })

    it('renders', () => {
      expect(wrapper.container.firstChild).toMatchSnapshot()
    })
  })
})
