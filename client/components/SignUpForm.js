import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { signup } from '../store'

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
  const { handleSubmit, error } = props
  const classes = useStyles()
  const [formDetails, updateForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpassword: ''
  })
  const [agreedToTerms, checkTerms] = React.useState(false)
  const [optedIn, checkOptIn] = React.useState(false)
  const [isSubmitDisabled, disableSubmit] = React.useState(true)

  const formIsValid = () => {
    if (!agreedToTerms) return false
    return (
      !!formDetails.firstName &&
      !!formDetails.email &&
      !!formDetails.password &&
      !!formDetails.confirmpassword &&
      formDetails.password === formDetails.confirmpassword
    )
  }
  const handleChange = (e) => {
    const name = e.target.name
    const val = e.target.value
    updateForm({ ...formDetails, [name]: val })
    if (formIsValid()) {
      disableSubmit(false)
    }
  }

  return (
    <Container>
      <h3>Create your own Why Journal</h3>
      <p>
        Congratulations on taking your first step toward getting in touch with
        your why with the Why Journal!
      </p>
      <form onSubmit={handleSubmit} name="signup" className={classes.root}>
        <Box display="flex" alignItems="center">
          <TextField
            required
            variant="filled"
            label="email"
            name="email"
            type="text"
            onChange={handleChange}
          />
        </Box>
        <Box display="flex" alignItems="center">
          <TextField
            required
            variant="filled"
            label="first name"
            name="firstName"
            type="text"
            onChange={handleChange}
          />
          <TextField
            variant="filled"
            label="last name"
            name="lastName"
            type="text"
            onChange={handleChange}
          />
        </Box>
        <Box display="flex" alignItems="center">
          <TextField
            required
            variant="filled"
            label="password"
            name="password"
            type="password"
            onChange={handleChange}
          />
          <TextField
            required
            variant="filled"
            label="confirm password"
            name="confirmpassword"
            type="password"
            onChange={handleChange}
          />
        </Box>
        <Box display="flex" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={agreedToTerms}
                onChange={(e) => checkTerms(e.target.checked)}
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
                checked={optedIn}
                onChange={(e) => checkOptIn(e.target.checked)}
                name="optin"
              />
            }
            label="Yes, I want emails from the Thoughtful Beast on promotions, offers, or whatever."
          />
        </Box>
        <Box display="flex" alignItems="center">
          <Button disabled={isSubmitDisabled} variant="contained" type="submit">
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
    error: state.user.me.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      const optin = evt.target.optin.checked
      dispatch(signup(firstName, lastName, email, password, optin))
    }
  }
}

export default connect(mapSignup, mapDispatch)(SignUpForm)

/**
 * PROP TYPES
 */
SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
