import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSinglePromptThunk } from '../store'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

class SinglePrompt extends Component {
  constructor() {
    super()
    //state will be used to toggle an update-form on this page
    this.state = {}
  }

  componentDidMount() {
    const promptId = this.props.match.params.promptId
    this.props.getPrompt(promptId)
  }

  render() {
    const { prompt } = this.props

    return (
      <div>
        <h1>All Prompts</h1>

        {prompt && (
          <div>
            <Card>
              <CardContent>SUBJECT: {prompt.subject}</CardContent>
            </Card>

            <Card>
              <CardContent>DETAILS: {prompt.details}</CardContent>
            </Card>
          </div>
        )}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    prompt: state.prompt.single
  }
}

const mapDispatch = (dispatch) => {
  return {
    getPrompt(promptId) {
      dispatch(getSinglePromptThunk(promptId))
    }
  }
}

export default connect(mapState, mapDispatch)(SinglePrompt)

/**
 * PROP TYPES
 */
SinglePrompt.propTypes = {
  prompt: PropTypes.object.isRequired
}