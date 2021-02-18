import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPromptThunk } from '../store'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class NewPromptForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: '',
      details: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {}
  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.addPrompt({
      subject: this.state.subject,
      details: this.state.details
    })
    this.setState({
      subject: '',
      details: ''
    })
  }

  render() {
    return (
      <div>
        <h4>New Prompt</h4>
        <form
          onSubmit={this.handleSubmit}
          name="newPrompt"
          className="new-prompt"
        >
          <div>
            <TextField
              variant="outlined"
              label="subject"
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
              label="details"
              multiline
              rows={15}
              name="details"
              type="text"
              onChange={this.handleChange}
              value={this.state.details}
            />
          </div>
          <Button variant="contained" color="primary" type="submit">
            Create Prompt
          </Button>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user.me
  }
}

const mapDispatch = (dispatch) => {
  return {
    addPrompt(prompt) {
      dispatch(addPromptThunk(prompt))
    }
  }
}

export default connect(mapState, mapDispatch)(NewPromptForm)

/**
 * PROP TYPES
 */
NewPromptForm.propTypes = {
  user: PropTypes.object.isRequired
}
