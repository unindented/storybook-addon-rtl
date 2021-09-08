import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RTLPanelComponent from '../../components/RTLPanel'
import { getDefaultTextDirection } from '../../utils'
import { INITIALIZE_EVENT_ID, UPDATE_EVENT_ID } from '../../constants'

export default class RTLPanel extends Component {
  constructor (props) {
    super(props)
    this.emitCurrentState = this.emitCurrentState.bind(this)
    this.handlePanelChange = this.handlePanelChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)

    // Get the direction most recently emitted before the panel was opened.
    const lastDirection = this.props.channel.last(UPDATE_EVENT_ID)?.[0].direction
    const defaultDirection = lastDirection || getDefaultTextDirection(props.api)
    this.state = { direction: defaultDirection }
    this.props.channel.emit(UPDATE_EVENT_ID, { direction: defaultDirection, userInteraction: false })
  }

  componentDidMount () {
    this.props.channel.on(INITIALIZE_EVENT_ID, this.emitCurrentState)
    // Update events can be emitted either by this component (when the toggle value changes)
    // or by the register code, which emits an event when a new story is rendered that has a parameter value.
    this.props.channel.on(UPDATE_EVENT_ID, this.handleUpdate)
  }

  handleUpdate (update) {
    this.setState({ direction: update.direction })
  }

  componentWillUnmount () {
    this.props.channel.removeListener(INITIALIZE_EVENT_ID, this.emitCurrentState)
    this.props.channel.removeListener(UPDATE_EVENT_ID, this.handleUpdate)
  }

  emitCurrentState () {
    this.props.channel.emit(UPDATE_EVENT_ID, this.state)
  }

  handlePanelChange (checked) {
    this.props.channel.emit(UPDATE_EVENT_ID, { direction: checked ? 'rtl' : 'ltr', userInteraction: true })
  }

  render () {
    const { direction } = this.state

    return (
      <RTLPanelComponent
        checked={direction === 'rtl'}
        onChange={this.handlePanelChange}
      />
    )
  }
}

RTLPanel.propTypes = {
  api: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired
}
