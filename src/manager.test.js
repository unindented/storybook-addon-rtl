import { addons, mockChannel } from '@storybook/addons'
import { STORY_RENDERED } from '@storybook/core-events'
import { UPDATE_EVENT_ID } from './constants'
import { setDirectionOnStoryChange } from './manager'
import * as Utils from './utils'

describe('setDirectionByParameters', () => {
  const updateHandler = jest.fn()
  const api = {
    getCurrentParameter: jest.fn(),
    getQueryParam: jest.fn()
  }
  let channel

  beforeEach(() => {
    updateHandler.mockClear()

    addons.setChannel(mockChannel())
    channel = addons.getChannel()
    channel.on(UPDATE_EVENT_ID, updateHandler)
    channel.emit(UPDATE_EVENT_ID, { direction: 'ltr' })
    setDirectionOnStoryChange(api)
  })

  afterEach(() => {
    api.getCurrentParameter = jest.fn()
  })

  it('emits story parameter when story is rendered', () => {
    api.getCurrentParameter.mockReturnValue('rtl')

    channel.emit(STORY_RENDERED)
    expect(updateHandler).toHaveBeenLastCalledWith({ direction: 'rtl', userInteraction: false })
  })

  it('works when panel has never been opened', () => {
    // cause channel to return undefined as if no events have ever been fired
    channel.emit(UPDATE_EVENT_ID, undefined)
    const defaultDirSpy = jest.spyOn(Utils, 'getDefaultTextDirection').mockReturnValue('defaultRTL')

    channel.emit(STORY_RENDERED)

    expect(defaultDirSpy).toHaveBeenCalled()
    expect(updateHandler).toHaveBeenLastCalledWith({ direction: 'defaultRTL', userInteraction: false })

    defaultDirSpy.mockRestore()
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
