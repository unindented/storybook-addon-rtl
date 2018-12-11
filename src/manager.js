import React from 'react'
import addons from '@storybook/addons'
import RTLPanel from './containers/RTLPanel'
import {ADDON_ID, PANEL_ID} from './constants'

export function register () {
  addons.register(ADDON_ID, (api) => {
    const channel = addons.getChannel()
    addons.addPanel(PANEL_ID, {
      title: 'RTL',
      render: props => {
        const active = !props || props.active /* eslint-disable-line react/prop-types */

        if (!active) {
          return null
        }

        return (<RTLPanel channel={channel} api={api} />)
      }
    })
  })
}
