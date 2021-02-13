import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

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
        <Card>
          <CardContent>
            <Link to={`/admin/all-prompts`}>Manage Prompts</Link>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Link to={`/admin/all-users`}>Manage Users</Link>
          </CardContent>
        </Card>
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
