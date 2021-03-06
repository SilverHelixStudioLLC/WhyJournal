import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import Button from '@material-ui/core/Button'

const Navbar = ({ handleClick, isLoggedIn, userIsAdmin }) => (
  <div>
    <Link to="/">
      <h1>Why Journal</h1>
    </Link>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Button href="/home">Home</Button>
          <Button href="/new-entry-form">New Entry</Button>
          {userIsAdmin ? (
            <Button href="/admin/dashboard">Admin Dashboard</Button>
          ) : null}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Button href="/login">Login</Button>
          <Button href="/signup">Sign Up</Button>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.me.id,
    userIsAdmin: !!state.user.me.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
