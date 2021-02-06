import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  getAllEntriesThunk,
  getEntryCountThunk,
  getAllMyPromptsThunk
} from '../store'
import { Link } from 'react-router-dom'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
    margin: '2em'
  }
})

/**
 * COMPONENT
 */
export const Home = (props) => {
  const {
    user,
    entries,
    entryCount,
    getEntryCount,
    getAllEntries,
    getPrompts,
    prompts
  } = props

  useEffect(() => {
    getEntryCount(user.id)
    getAllEntries(user.id)
    getPrompts(user.id)
  }, [])

  const classes = useStyles()

  return (
    <div>
      <h3>Welcome, {user.firstName}</h3>
      <p>You have {entryCount} entries. </p>
      {entries &&
        entries.map((e) => (
          <Card key={e.id} className={classes.root}>
            <CardContent>
              <Link to={`/entry/${e.id}`}>
                {prompts[e.promptId] && prompts[e.promptId].subject}{' '}
                {e.updatedAt}
              </Link>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user.me,
    entries: state.entry.all,
    entryCount: state.entry.count,
    email: state.user.me.email,
    prompts: state.prompt.all
  }
}

const mapDispatch = (dispatch) => {
  return {
    getEntryCount(userId) {
      dispatch(getEntryCountThunk(userId))
    },
    getPrompts(userId) {
      dispatch(getAllMyPromptsThunk(userId))
    },
    getAllEntries(userId) {
      dispatch(getAllEntriesThunk(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Home)

/**
 * PROP TYPES
 */
Home.propTypes = {
  user: PropTypes.object.isRequired
}
