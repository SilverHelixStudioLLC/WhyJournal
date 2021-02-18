import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllPromptsThunk } from '../store'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'

class AllPrompts extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getAllPrompts()
  }

  render() {
    const { prompts } = this.props
    const promptKeys = Object.keys(prompts)

    return (
      <div>
        <h1>All Prompts</h1>
        <Button
          variant="contained"
          color="primary"
          href="/admin/new-prompt-form"
        >
          Add New Prompt
        </Button>
        {promptKeys &&
          promptKeys.map((promptId) => (
            <Card key={promptId}>
              <CardContent>
                <Link to={`/admin/single-prompt/${promptId}`}>
                  {prompts[promptId] && prompts[promptId].subject}{' '}
                </Link>
              </CardContent>
            </Card>
          ))}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    prompts: state.prompt.all
  }
}

const mapDispatch = (dispatch) => {
  return {
    getAllPrompts() {
      dispatch(getAllPromptsThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(AllPrompts)

/**
 * PROP TYPES
 */
AllPrompts.propTypes = {
  prompts: PropTypes.object.isRequired
}
