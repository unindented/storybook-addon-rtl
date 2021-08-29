import addons, { mockChannel } from '@storybook/addons'
import { STORY_RENDERED } from '@storybook/core-events'
import { UPDATE_EVENT_ID } from './constants'
import { setDirectionOnStoryChange } from './manager'

describe('setDirectionByParameters', () => {
  const updateHandler = jest.fn()
  const api = {
    getCurrentParameter: jest.fn(),
    getQueryParam: jest.fn()
  }
  let channel

  beforeEach(() => {
    updateHandler.mockReset()
    addons.setChannel(mockChannel())
    channel = addons.getChannel()
    channel.on(UPDATE_EVENT_ID, updateHandler)
    channel.emit(UPDATE_EVENT_ID, { direction: 'ltr' })
    setDirectionOnStoryChange(api)
  })

  it('emits story parameter when story is rendered', () => {
    api.getCurrentParameter.mockReturnValue('rtl')

    channel.emit(STORY_RENDERED)
    expect(updateHandler).toHaveBeenLastCalledWith({ direction: 'rtl', userInteraction: false })
  })

  it('emits last user interaction when story is rendered without parameters', () => {
    api.getCurrentParameter.mockReturnValue(undefined)
    channel.emit(UPDATE_EVENT_ID, { direction: 'ltr', userInteraction: true })

    channel.emit(STORY_RENDERED)
    expect(updateHandler).toHaveBeenLastCalledWith({ direction: 'ltr', userInteraction: false })
  })

  it('emits story parameter even if there was previous user interaction', () => {
    channel.emit(UPDATE_EVENT_ID, { direction: 'ltr', userInteraction: true })
    api.getCurrentParameter.mockReturnValue('rtl')

    channel.emit(STORY_RENDERED)
    expect(updateHandler).toHaveBeenLastCalledWith({ direction: 'rtl', userInteraction: false })
  })

  it('emits last user interaction when switching from parameter story to non-parameter story', () => {
    channel.emit(UPDATE_EVENT_ID, { direction: 'ltr', userInteraction: true })
    api.getCurrentParameter.mockReturnValue('rtl')
    channel.emit(STORY_RENDERED)

    api.getCurrentParameter.mockReturnValue(undefined)
    channel.emit(STORY_RENDERED)

    expect(updateHandler).toHaveBeenLastCalledWith({ direction: 'ltr', userInteraction: false })
  })

  it('emits default direction when switching from parameter story to non-parameter story', () => {
    api.getCurrentParameter.mockReturnValue('rtl')
    channel.emit(STORY_RENDERED)
    expect(updateHandler).toHaveBeenLastCalledWith({ direction: 'rtl', userInteraction: false })

    api.getCurrentParameter.mockReturnValue(undefined)
    channel.emit(STORY_RENDERED)

    expect(updateHandler).toHaveBeenLastCalledWith({ direction: 'ltr', userInteraction: false })
  })
})
