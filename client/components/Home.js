import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllEntriesThunk, getEntryCountThunk } from '../store'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
export const Home = (props) => {
  const {
    userId,
    userFirstName,
    entries,
    entryCount,
    getEntryCount,
    getAllEntries
  } = props

  useEffect(() => {
    getEntryCount(userId)
    getAllEntries(userId)
  }, [])

  return (
    <div>
      <h3>Welcome, {userFirstName}</h3>
      <p>You have {entryCount} entries. </p>
      <ul>
        {entries &&
          entries.map((e) => (
            <li>
              <Link key={e.id} to={`/entry/${e.id}`}>
                {e.updatedAt}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    userId: state.user.me.id,
    userFirstName: state.user.me.firstName,
    entries: state.entry.all,
    entryCount: state.entry.count,
    email: state.user.me.email
  }
}

const mapDispatch = (dispatch) => {
  return {
    getEntryCount(userId) {
      dispatch(getEntryCountThunk(userId))
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
  email: PropTypes.string
}
