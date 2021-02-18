import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSinglePromptThunk, removePromptThunk } from '../store'
import history from '../history'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
// import PropTypes from 'prop-types' TODO: add back
class SinglePrompt extends Component {
  constructor() {
    super()

    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    const promptId = this.props.match.params.promptId
    this.props.getPrompt(promptId)
  }

  handleRemove(promptId) {
    this.props.removePrompt(promptId)
    history.push('/admin/all-prompts')
  }

  render() {
    const prompt = this.props.prompt
    const promptId = this.props.match.params.promptId

    return (
      <div>
        <h1>Prompt {promptId} </h1>
        <Button
          variant="contained"
          color="primary"
          href={`/admin/update-prompt-form/${promptId}`}
        >
          Update Prompt
        </Button>
        {prompt && (
          <div>
            <Card>
              <CardContent>SUBJECT: {prompt.subject}</CardContent>
              <CardContent>DETAILS: {prompt.details}</CardContent>
            </Card>
          </div>
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => this.handleRemove(promptId)}
        >
          Delete Prompt
        </Button>
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
    },
    removePrompt(promptId) {
      dispatch(removePromptThunk(promptId))
    }
  }
}

export default connect(mapState, mapDispatch)(SinglePrompt)
