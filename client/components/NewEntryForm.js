import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../history'
import { addEntryThunk, getSinglePromptThunk, updateUserThunk } from '../store'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class NewEntryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      characterCount: 0,
      wordCount: 0,
      characterLimit: 5000
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
    this.setState({ characterCount: this.state.content.length + 1 })
    this.setState({ wordCount: this.state.content.split(' ').length })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.addEntry({
      userId: this.props.user.id,
      promptId: this.props.user.currentPrompt,
      title: this.state.title,
      content: this.state.content
    })
    this.props.updateUser(this.props.user, this.props.user.id, {
      ...this.props.user,
      currentPrompt: this.props.user.currentPrompt + 1
    })
    this.setState({
      title: '',
      content: ''
    })
    history.push('/home')
  }

  render() {
    const promptSubject = this.props.promptSubject
    const promptDetails = this.props.promptDetails
    const curDate = DateTime.now()
    return (
      <div>
        <h4>{curDate.toLocaleString(DateTime.DATETIME_MED)}</h4>
        <h3>{promptSubject}</h3>
        <div className="new-entry-stats">
          <div>
            {this.state.characterCount} / {this.state.characterLimit} characters
          </div>
          <div>{this.state.wordCount} words</div>
        </div>
        <br />
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
              inputProps={{ maxLength: 5000 }}
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
    updateUser(reqUser, userId, user) {
      dispatch(updateUserThunk(reqUser, userId, user))
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
