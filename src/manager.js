import React from 'react'
import { addons } from '@storybook/addons'
import { STORY_RENDERED } from '@storybook/core-events'
import RTLPanel from './containers/RTLPanel'
import { ADDON_ID, PANEL_ID, UPDATE_EVENT_ID } from './constants'
import { getDefaultTextDirection } from './utils'

export function register () {
  addons.register(ADDON_ID, (api) => {
    const channel = addons.getChannel()
    setDirectionOnStoryChange(api)

    addons.addPanel(PANEL_ID, {
      title: 'RTL',
      render: ({ active, key }) => { /* eslint-disable-line react/prop-types, react/display-name */
        if (!active) {
          return null
        }

        return (<RTLPanel key={key} channel={channel} api={api} />)
      }
    })
  })
}

export function setDirectionOnStoryChange (api) {
  const channel = addons.getChannel()

  // Keep track of the most recent value that was a result of user interaction
  // so we can return to this value whenever a story is opened that does not have a parameter
  let lastUserInteractionValue
  // Whenever a story is rendered, update the state to represent the parameter value of the story.
  // We do this here and not in the panel component because we want the parameter to be respected
  // even if the panel is never opened
  channel.on(STORY_RENDERED, (_) => {
    const lastUpdate = channel.last(UPDATE_EVENT_ID)?.[0]
    lastUserInteractionValue = lastUpdate?.userInteraction ? lastUpdate.direction : lastUserInteractionValue

    const paramValue = api.getCurrentParameter('direction')
    let newDirection
    if (paramValue) {
      newDirection = paramValue
    } else if (lastUserInteractionValue) {
      newDirection = lastUserInteractionValue
    } else {
      newDirection = getDefaultTextDirection(api)
    }
    channel.emit(UPDATE_EVENT_ID, { direction: newDirection, userInteraction: false })
  })
}
