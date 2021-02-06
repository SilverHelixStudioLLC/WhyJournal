import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addEntryThunk, getSinglePromptThunk, updateUserThunk} from '../store'
import PropTypes from 'prop-types'

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
    const {name, value} = event.target
    this.setState({[name]: value})
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
    return (
      <div>
        <h3>New Entry</h3>
        <h3>{promptSubject}</h3>
        <form onSubmit={this.handleSubmit} name={name}>
          <TextField
            variant="filled"
            label="title"
            name="title"
            type="text"
            onChange={this.handleChange}
            value={this.state.title}
          />
          <TextField
            variant="filled"
            label="content"
            name="content"
            type="text"
            onChange={this.handleChange}
            value={this.state.content}
          />
          <Button type="submit">Create Entry</Button>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user.me,
    promptSubject: state.prompt.single.subject
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
