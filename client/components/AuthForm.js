import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    },
    '& .MuiButton-root': {
      margin: theme.spacing(1)
    }
  }
}))

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { handleSubmit, error } = props
  const classes = useStyles()

  return (
    <Container>
      <h3>Login</h3>
      <form onSubmit={handleSubmit} name="login" className={classes.root}>
        <Box display="flex" alignItems="center">
          <TextField variant="filled" label="email" name="email" type="text" />
          <TextField
            variant="filled"
            label="password"
            name="password"
            type="password"
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
          <Button variant="contained" color="primary" href="/auth/google">
            Login with Google
          </Button>
        </Box>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </Container>
  )
}

const mapLogin = (state) => {
  return {
    error: state.user.me.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
