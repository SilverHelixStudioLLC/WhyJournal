import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_PROMPTS = 'GET_ALL_PROMPTS'
const GET_SINGLE_PROMPT = 'GET_SINGLE_PROMPT'
const ADD_PROMPT = 'ADD_PROMPT'
const UPDATE_PROMPT = 'UPDATE_PROMPT'
const REMOVE_PROMPT = 'REMOVE_PROMPT'

/**
 * ACTION CREATORS
 */
const getAllPrompts = (prompts) => ({ type: GET_ALL_PROMPTS, prompts })
const getSinglePrompt = (prompt) => ({ type: GET_SINGLE_PROMPT, prompt })
const addPrompt = (prompt) => ({ type: ADD_PROMPT, prompt })
const updatePrompt = (prompt) => ({ type: UPDATE_PROMPT, prompt })
const removePrompt = (promptId) => ({ type: REMOVE_PROMPT, promptId })

/**
 * THUNK CREATORS
 */

export const getAllPromptsThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/prompts')
      const normalizedData = data.reduce((ac, cu) => {
        ac[cu.id] = cu
        return ac
      }, {})
      dispatch(getAllPrompts(normalizedData))
    } catch (err) {
      console.error(err.message)
    }
  }
}

// gets only the prompts that a single user has already responded to.
// in a future where we might not want a user to load every single prompt
export const getAllMyPromptsThunk = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/prompts/user/${userId}`)
      const normalizedData = data.reduce((ac, cu) => {
        ac[cu.id] = cu
        return ac
      }, {})
      dispatch(getAllPrompts(normalizedData))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getSinglePromptThunk = (promptId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/prompts/id/${promptId}`)
      dispatch(getSinglePrompt(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const addPromptThunk = (prompt) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/admin/prompts', prompt)
      dispatch(addPrompt(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updatePromptThunk = (promptUpdates, promptId) => {
  return async (dispatch) => {
    try {
      let { promptSubject } = promptUpdates

      let putObject = {
        id: promptId,
        subject: promptSubject
      }

      const { data } = await axios.put(
        `/api/admin/prompts/${promptId}`,
        putObject
      )

      dispatch(updatePrompt(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const removePromptThunk = (promptId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/admin/prompts/${promptId}`)
      dispatch(removePrompt(promptId))
    } catch (err) {
      console.error(err.message)
    }
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  all: {},
  single: {}
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PROMPTS:
      return { ...state, all: action.prompts }
    case GET_SINGLE_PROMPT:
      return { ...state, single: action.prompt }
    case ADD_PROMPT:
      return { ...state, all: [...state.all, action.prompt] }
    case UPDATE_PROMPT:
      return {
        ...state,
        single: action.prompt,
        all: state.all.map((prompt) => {
          if (prompt.id === action.prompt.id) prompt = action.prompt
          return prompt
        })
      }
    case REMOVE_PROMPT:
      return {
        ...state,
        all: state.all.filter((prompt) => prompt.id !== action.promptId)
      }

    default:
      return state
  }
}
