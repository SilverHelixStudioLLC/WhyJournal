import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSinglePromptThunk, updatePromptThunk } from '../store'
import history from '../history'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class UpdatePromptForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: '',
      details: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const promptId = this.props.match.params.promptId
    this.props.getPrompt(promptId)
  }
  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.updatePrompt(
      {
        subject: this.state.subject,
        details: this.state.details
      },
      this.props.match.params.promptId
    )
    this.setState({
      subject: '',
      details: ''
    })
    history.push(`/admin/single-prompt/${this.props.match.params.promptId}`)
  }

  render() {
    const { prompt } = this.props

    return (
      <div>
        {prompt && (
          <div>
            <h4>Prompt {this.props.match.params.promptId} </h4>
            <form
              onSubmit={this.handleSubmit}
              name="newPrompt"
              className="new-prompt"
            >
              <div>
                <TextField
                  variant="outlined"
                  label={this.props.prompt.subject}
                  multiline
                  rows={7}
                  name="subject"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.subject}
                />
              </div>
              <div>
                <TextField
                  variant="outlined"
                  label={this.props.prompt.details}
                  multiline
                  rows={15}
                  name="details"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.details}
                />
              </div>
              <Button variant="contained" color="primary" type="submit">
                Update Prompt
              </Button>
            </form>
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
    },
    updatePrompt(updatedPrompt, promptId) {
      dispatch(updatePromptThunk(updatedPrompt, promptId))
    }
  }
}

export default connect(mapState, mapDispatch)(UpdatePromptForm)

/**
 * PROP TYPES
 */
UpdatePromptForm.propTypes = {
  prompt: PropTypes.object.isRequired
}
