import axios from 'axios'
import moment from 'moment'

/**
 * ACTION TYPES
 */
const GET_ALL_ENTRIES = 'GET_ALL_ENTRIES'
const GET_SINGLE_ENTRY = 'GET_SINGLE_ENTRY'
const GET_ENTRY_COUNT = 'GET_ENTRY_COUNT'
const ADD_ENTRY = 'ADD_ENTRY'
const UPDATE_ENTRY = 'UPDATE_ENTRY'
const REMOVE_ENTRY = 'REMOVE_ENTRY'

/**
 * ACTION CREATORS
 */
const getAllEntries = (entries) => ({ type: GET_ALL_ENTRIES, entries })
const getSingleEntry = (entry) => ({ type: GET_SINGLE_ENTRY, entry })
const getEntryCount = (count) => ({ type: GET_ENTRY_COUNT, count })
const addEntry = (entry) => ({ type: ADD_ENTRY, entry })
const updateEntry = (entry) => ({ type: UPDATE_ENTRY, entry })
const removeEntry = (entryId) => ({ type: REMOVE_ENTRY, entryId })

/**
 * THUNK CREATORS
 */

export const getAllEntriesThunk = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/entries/user/${userId}`)
      const formattedData = data.map((en) => {
        en.updatedAt = moment(en.updatedAt).format('MMMM DD, YYYY')
        return en
      })
      dispatch(getAllEntries(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getSingleEntryThunk = (userId, entryId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/entries/user/${userId}/entry/${entryId}`
      )
      dispatch(getSingleEntry(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getEntryCountThunk = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/entries/user/${userId}/count/entries`
      )
      dispatch(getEntryCount(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const addEntryThunk = (entry) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/entries', entry)
      dispatch(addEntry(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updateEntryThunk = (userId, entryId, entryUpdates) => {
  return async (dispatch) => {
    try {
      let { entriesubject } = entryUpdates

      let putObject = {
        id: entryId,
        subject: entriesubject
      }

      const { data } = await axios.put(
        `/api/entries/user/${userId}/entry/${entryId}`,
        putObject
      )

      dispatch(updateEntry(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const removeEntryThunk = (userId, entryId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/entries/user/${userId}/entry/${entryId}`)
      dispatch(removeEntry(entryId))
    } catch (err) {
      console.error(err.message)
    }
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  all: [],
  single: {},
  count: 0
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ENTRIES:
      return { ...state, all: action.entries }
    case GET_SINGLE_ENTRY:
      return { ...state, single: action.entry }
    case GET_ENTRY_COUNT:
      return { ...state, count: action.count }
    case ADD_ENTRY:
      return { ...state, all: [...state.all, action.entry] }
    case UPDATE_ENTRY:
      return {
        ...state,
        single: action.entry,
        all: state.all.map((entry) => {
          if (entry.id === action.entry.id) entry = action.entry
          return entry
        })
      }
    case REMOVE_ENTRY:
      return {
        ...state,
        all: state.all.filter((entry) => entry.id !== action.entryId)
      }

    default:
      return state
  }
}
