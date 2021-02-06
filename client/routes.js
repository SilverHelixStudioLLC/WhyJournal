import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Home,
  Login,
  SignUpForm,
  SingleEntry,
  LandingPage,
  NewEntryForm,
  AdminDashboard
} from './components'
import { me } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn, userIsAdmin } = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUpForm} />
        {isLoggedIn && userIsAdmin && (
          <Switch>
            {/* Routes placed here are only available to logged in admins */}
            <Route path="/home" component={Home} />
            <Route path="/entry/:entryId" component={SingleEntry} />
            <Route path="/new-entry-form" component={NewEntryForm} />
            <Route path="/admin/dashboard" component={AdminDashboard} />
            {/* Displays Home component as fallback */}
            <Route component={Home} />
          </Switch>
        )}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={Home} />
            <Route path="/entry/:entryId" component={SingleEntry} />
            <Route path="/new-entry-form" component={NewEntryForm} />
            {/* Displays Home component as fallback */}
            <Route component={Home} />
          </Switch>
        )}

        {/* Displays our Landing Page component as a fallback */}
        <Route component={LandingPage} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.me.id,
    userIsAdmin: !!state.user.me.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  userIsAdmin: PropTypes.bool.isRequired
}
