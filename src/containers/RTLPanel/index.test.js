import React from 'react'
import { shallow, configure } from 'enzyme'
import RTLPanel from '.'
import Adapter from 'enzyme-adapter-react-16'
import { UPDATE_EVENT_ID } from '../../constants'

configure({ adapter: new Adapter() })

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
      wrapper = shallow(<RTLPanel api={api} channel={channel} />)
    })

    it('renders', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('with query parameter', () => {
    beforeEach(() => {
      api.getQueryParam.mockReturnValue('rtl')
      wrapper = shallow(<RTLPanel api={api} channel={channel} />)
    })

    it('renders', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('with direction set while panel closed', () => {
    beforeEach(() => {
      channel.last.mockReturnValue([{ direction: 'rtl' }])
      wrapper = shallow(<RTLPanel api={api} channel={channel} />)
    })

    it('renders', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  // Simulate a story param by emitting an event after the component is created
  describe('with story param', () => {
    let updateEventHandler = () => {}

    beforeEach(() => {
      api.getQueryParam.mockReturnValue('rtl')
      channel.on.mockImplementation((eventID, handler) => {
        if (eventID === UPDATE_EVENT_ID) {
          updateEventHandler = handler
        }
      })
      wrapper = shallow(<RTLPanel api={api} channel={channel} />)
    })

    it('renders', () => {
      updateEventHandler({ direction: 'rtl' })

      expect(wrapper).toMatchSnapshot()
    })

    it('responds to changes', () => {
      updateEventHandler({ direction: 'rtl' })
      expect(wrapper).toMatchSnapshot()

      updateEventHandler({ direction: 'ltr' })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
