import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getEntryCountThunk } from '../store'

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { entryCount, getEntryCount, user } = props

  useEffect(() => {
    getEntryCount(user.id)
  }, [])

  return (
    <div>
      <h3>Welcome, {user.firstName}</h3>
      <p>You have {entryCount} entries. </p>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user.me,
    entryCount: state.entry.count
  }
}

const mapDispatch = (dispatch) => {
  return {
    getEntryCount(userId) {
      dispatch(getEntryCountThunk(userId))
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
