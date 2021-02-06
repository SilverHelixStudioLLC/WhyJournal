import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class AdminDashboard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const user = this.props.user
    return (
      <div>
        <h3>Admin Dashboard</h3>
        <p> Hello {user.firstName}</p>
        <p>What would you like to do?</p>
        <ul>
          <li>Manage Prompts</li>
          <li>Manage Users</li>
        </ul>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user.me
  }
}

// const mapDispatch = (dispatch) => {
//   return {
//   }
// }

export default connect(mapState)(AdminDashboard)

/**
 * PROP TYPES
 */
AdminDashboard.propTypes = {
  user: PropTypes.object.isRequired
}
