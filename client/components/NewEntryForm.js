import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addEntryThunk, getSinglePromptThunk, updateUserThunk } from '../store'
import PropTypes from 'prop-types'
import moment from 'moment'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
class NewEntryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const promptId = this.props.user.currentPrompt
    this.props.getPrompt(promptId)
  }
  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.addEntry({
      userId: this.props.user.id,
      promptId: this.props.user.currentPrompt,
      title: this.state.title,
      content: this.state.content
    })
    this.props.updateUser(this.props.user.id, {
      ...this.props.user,
      currentPrompt: this.props.user.currentPrompt + 1
    })
    this.setState({
      title: '',
      content: ''
    })
  }

  render() {
    const promptSubject = this.props.promptSubject
    const promptDetails = this.props.promptDetails
    return (
      <div>
        <h4>{moment().format('MMMM DD, h:mm a')}</h4>
        <h3>{promptSubject}</h3>
        <form
          onSubmit={this.handleSubmit}
          name="newEntry"
          className="new-entry"
        >
          <div>
            <TextField
              variant="outlined"
              label={promptDetails}
              multiline
              rows={20}
              name="content"
              type="text"
              onChange={this.handleChange}
              value={this.state.content}
            />
          </div>
          <Button variant="contained" color="primary" type="submit">
            Done!
          </Button>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user.me,
    promptSubject: state.prompt.single.subject,
    promptDetails: state.prompt.single.details
  }
}

const mapDispatch = (dispatch) => {
  return {
    addEntry(entry) {
      dispatch(addEntryThunk(entry))
    },
    updateUser(userId, user) {
      dispatch(updateUserThunk(userId, user))
    },
    getPrompt(promptId) {
      dispatch(getSinglePromptThunk(promptId))
    }
  }
}

export default connect(mapState, mapDispatch)(NewEntryForm)

/**
 * PROP TYPES
 */
NewEntryForm.propTypes = {
  user: PropTypes.object.isRequired
}
