import {configure} from '@storybook/react'
import {initializeRTL} from '../src'

initializeRTL()

configure(() => { require('./stories') }, module)
