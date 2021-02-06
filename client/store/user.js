import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'
const GET_SINGLE_USER = 'GET_SINGLE_USER'
const ADD_USER = 'ADD_USER'
const UPDATE_USER = 'UPDATE_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_ME = 'GET_ME'
const LOGOUT_USER = 'LOGOUT_USER'

/**
 * ACTION CREATORS
 */
const getAllUsers = (users) => ({ type: GET_ALL_USERS, users })
const getSingleUser = (user) => ({ type: GET_SINGLE_USER, user })
const addUser = (user) => ({ type: ADD_USER, user })
const updateUser = (user) => ({ type: UPDATE_USER, user })
const removeUser = (userId) => ({ type: REMOVE_USER, userId })
const getMe = (me) => ({ type: GET_ME, me })
const logoutUser = () => ({ type: LOGOUT_USER })

/**
 * THUNK CREATORS
 */
export const getAllUsersThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/admin/users')
      dispatch(getAllUsers(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

//The getSingleUserThunk below is set for the admin route,
//since users can use user.me state upon login
//we may want users to be able to see other users, needs further discussion
export const getSingleUserThunk = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/admin/users/${userId}`)
      dispatch(getSingleUser(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const addUserThunk = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/admin/users`, user)
      dispatch(addUser(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

//the following thunks are dynamic, distinguishing between admin and non-admin users
export const updateUserThunk = (reqUser, userId, user) => {
  return async (dispatch) => {
    try {
      let route = ''
      if (reqUser.isAdmin) route = 'admin'
      else route = 'api'
      const { data } = await axios.put(`/${route}/users/${userId}`, user)
      dispatch(updateUser(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const removeUserThunk = (reqUser, userId) => {
  return async (dispatch) => {
    try {
      let route = ''
      if (reqUser.isAdmin) route = 'admin'
      else route = 'api'
      await axios.delete(`/${route}/users/${userId}`)
      dispatch(removeUser(userId))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const me = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getMe(res.data || {}))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password) => async (dispatch) => {
  let res
  try {
    res = await axios.post('/auth/login', { email, password })
  } catch (authError) {
    return dispatch(getMe({ error: authError }))
  }

  try {
    dispatch(getMe(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const signup = (firstName, lastName, email, password, optin) => async (
  dispatch
) => {
  let res
  try {
    res = await axios.post(`/auth/signup`, {
      firstName,
      lastName,
      email,
      password,
      emailOptIn: optin
    })
  } catch (authError) {
    return dispatch(getMe({ error: authError }))
  }

  try {
    dispatch(getMe(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout')
    dispatch(logoutUser())
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}

/**
 * INITIAL STATE
 */

const initialState = {
  all: [],
  single: {},
  me: {}
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, all: action.users }
    case GET_SINGLE_USER:
      return { ...state, single: action.user }
    case ADD_USER:
      return { ...state, all: [...state.all, action.user] }
    case UPDATE_USER:
      return {
        ...state,
        single: action.user,
        all: state.all.map((user) => {
          if (user.id === action.user.id) user = action.user
          return user
        })
      }
    case REMOVE_USER:
      return {
        ...state,
        all: state.all.filter((user) => user.id !== action.userId)
      }
    case GET_ME:
      return { ...state, me: action.me }
    case LOGOUT_USER:
      return { ...state, me: {} }
    default:
      return state
  }
}
