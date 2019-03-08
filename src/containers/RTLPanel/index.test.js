import React from 'react'
import { shallow, configure } from 'enzyme'
import RTLPanel from '.'
import Adapter from 'enzyme-adapter-react-16'

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
})
