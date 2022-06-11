import { render, act } from '@testing-library/react'
import React from 'react'
import RTLPanel from '.'
import { UPDATE_EVENT_ID } from '../../constants'

describe('RTLPanel', () => {
  let api
  let channel
  let wrapper

  beforeEach(() => {
    api = {
      getQueryParam: jest.fn()
    }
    channel = {
      on: jest.fn(),
      last: jest.fn(),
      removeListener: jest.fn(),
      emit: jest.fn()
    }
  })

  describe('without query parameter', () => {
    beforeEach(() => {
      api.getQueryParam.mockReturnValue(undefined)
      wrapper = render(<RTLPanel api={api} channel={channel} />)
    })

    it('renders', () => {
      expect(wrapper.container.firstChild).toMatchSnapshot()
    })
  })

  describe('with query parameter', () => {
    beforeEach(() => {
      api.getQueryParam.mockReturnValue('rtl')
      wrapper = render(<RTLPanel api={api} channel={channel} />)
    })

    it('renders', () => {
      expect(wrapper.container.firstChild).toMatchSnapshot()
    })
  })

  describe('with direction set while panel closed', () => {
    beforeEach(() => {
      channel.last.mockReturnValue([{ direction: 'rtl' }])
      wrapper = render(<RTLPanel api={api} channel={channel} />)
    })

    it('renders', () => {
      expect(wrapper.container.firstChild).toMatchSnapshot()
    })
  })

  // Simulate a story param by emitting an event after the component is created
  describe('with story param', () => {
    let updateEventHandler = () => { }

    beforeEach(() => {
      api.getQueryParam.mockReturnValue('rtl')
      channel.on.mockImplementation((eventID, handler) => {
        if (eventID === UPDATE_EVENT_ID) {
          updateEventHandler = handler
        }
      })
      wrapper = render(<RTLPanel api={api} channel={channel} />)
    })

    it('renders', () => {
      act(() => {
        updateEventHandler({ direction: 'rtl' })
      })

      expect(wrapper.container.firstChild).toMatchSnapshot()
    })

    it('responds to changes', () => {
      act(() => {
        updateEventHandler({ direction: 'rtl' })
      })
      expect(wrapper.container.firstChild).toMatchSnapshot()

      act(() => {
        updateEventHandler({ direction: 'ltr' })
      })
      expect(wrapper.container.firstChild).toMatchSnapshot()
    })
  })
})
