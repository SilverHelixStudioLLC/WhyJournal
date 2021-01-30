import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
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
const SignUpForm = (props) => {
  const { name, handleSubmit, error } = props
  const classes = useStyles()
  const [checkedToS, checkToS] = React.useState(false)
  return (
    <Container>
      <h3>Create your own Why Journal</h3>
      <p>
        Congratulations on taking your first step toward getting in touch with
        your why with the Why Journal!
      </p>
      <form onSubmit={handleSubmit} name={name} className={classes.root}>
        <Box display="flex" alignItems="center">
          <TextField
            required
            variant="filled"
            label="email"
            name="email"
            type="text"
          />
        </Box>
        <Box display="flex" alignItems="center">
          <TextField
            required
            variant="filled"
            label="first name"
            name="first name"
            type="text"
          />
          <TextField
            variant="filled"
            label="last name"
            name="last name"
            type="text"
          />
        </Box>
        <Box display="flex" alignItems="center">
          <TextField
            required
            variant="filled"
            label="password"
            name="password"
            type="password"
          />
          <TextField
            required
            variant="filled"
            label="confirm password"
            name="password"
            type="password"
          />
        </Box>
        <Box display="flex" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedToS}
                onChange={(e) => checkToS(e.target.checked)}
                name="terms"
              />
            }
            label="I agree to the Terms of Service."
          />
        </Box>
        <Box display="flex" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedToS}
                onChange={(e) => checkToS(e.target.checked)}
                name="terms"
              />
            }
            label="Yes, I want emails from the Thoughtful Beast on promotions, offers, or whatever."
          />
        </Box>
        <Box display="flex" alignItems="center">
          <Button variant="contained" type="submit">
            Create Account
          </Button>
          <Button variant="contained" color="primary" href="/auth/google">
            Sign up with Google
          </Button>
        </Box>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </Container>
  )
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    error: state.user.me.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export default connect(mapSignup, mapDispatch)(SignUpForm)

/**
 * PROP TYPES
 */
SignUpForm.propTypes = {
  name: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
