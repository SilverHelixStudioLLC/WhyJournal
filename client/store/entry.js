import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ALL_ENTRIES = 'GET_ALL_ENTRIES';
const GET_SINGLE_ENTRY = 'GET_SINGLE_ENTRY';
const ADD_ENTRY = 'ADD_ENTRY';
const UPDATE_ENTRY = 'UPDATE_ENTRY';
const REMOVE_ENTRY = 'REMOVE_ENTRY';

/**
 * ACTION CREATORS
 */
const getAllEntries = (entries) => ({ type: GET_ALL_ENTRIES, entries });
const getSingleEntry = (entry) => ({ type: GET_SINGLE_ENTRY, entry });
const addEntry = (entry) => ({ type: ADD_ENTRY, entry });
const updateEntry = (entry) => ({ type: UPDATE_ENTRY, entry });
const removeEntry = (entryId) => ({ type: REMOVE_ENTRY, entryId });

/**
 * THUNK CREATORS
 */

export const getAllEntriesThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/entries');
      dispatch(getAllEntries(data));
    } catch (err) {
      console.error(err.message);
    }
  };
};

export const getSingleEntryThunk = (entryId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/entries/${entryId}`);
      dispatch(getSingleEntry(data));
    } catch (err) {
      console.error(err.message);
    }
  };
};

export const addEntryThunk = (entry) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('api/entries', entry);
      dispatch(addEntry(data));
    } catch (err) {
      console.error(err.message);
    }
  };
};

export const updateEntryThunk = (entryUpdates, entryId) => {
  return async (dispatch) => {
    try {
      let { entriesubject } = entryUpdates;

      let putObject = {
        id: entryId,
        subject: entriesubject,
      };

      const { data } = await axios.put(`/api/entries/${entryId}`, putObject);

      dispatch(updateEntry(data));
    } catch (err) {
      console.error(err.message);
    }
  };
};

export const removeEntryThunk = (entryId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/entries/${entryId}`);
      dispatch(removeEntry(entryId));
    } catch (err) {
      console.error(err.message);
    }
  };
};

/**
 * INITIAL STATE
 */
const initialState = {
  all: [],
  single: {},
};

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ENTRIES:
      return { ...state, all: action.entries };
    case GET_SINGLE_ENTRY:
      return { ...state, single: action.entry };
    case ADD_ENTRY:
      return { ...state, all: [...state.all, action.entry] };
    case UPDATE_ENTRY:
      return {
        ...state,
        single: action.entry,
        all: state.all.map((entry) => {
          if (entry.id === action.entry.id) entry = action.entry;
          return entry;
        }),
      };
    case REMOVE_ENTRY:
      return {
        ...state,
        all: state.all.filter((entry) => entry.id !== action.entryId),
      };

    default:
      return state;
  }
}