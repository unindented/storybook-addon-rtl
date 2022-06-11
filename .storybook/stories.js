import React from 'react'
import { action } from '@storybook/addon-actions'

import RTLToggle from '../src/components/RTLToggle'

export default {
  title: 'RTLToggle',
  component: RTLToggle
}
const Template = (args) => <RTLToggle onChange={action('change')} {...args}/>
export const basic = Template.bind({})

export const unchecked = Template.bind({})
export const checked = Template.bind({})
checked.args = { checked: true }
export const rtlParameter = Template.bind({})
rtlParameter.parameters = {
  direction: 'rtl'
}
