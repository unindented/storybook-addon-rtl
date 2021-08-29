import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import RTLToggle from '../src/components/RTLToggle'

storiesOf('RTLToggle', module)
  .add('default', () => (
    <RTLToggle onChange={action('change')} />
  ))
  .add(
    'unchecked',
    () => (<RTLToggle checked={false} onChange={action('change')} />)
  )
  .add(
    'rtl parameter',
    () => (<RTLToggle checked={false} onChange={action('change')} />),
    { direction: 'rtl' }
  )
  .add('checked', () => (
    <RTLToggle checked onChange={action('change')} />
  ))
