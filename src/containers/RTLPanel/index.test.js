import React from 'react'
import {shallow} from 'enzyme'
import RTLPanel from '.'

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
