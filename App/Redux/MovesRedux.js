import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchMoves: ['startDate', 'endDate'],
  fetchSuccess: ['moves'],
  fetchFailure: null,
  getMoves: null  
})

export const MovesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  startDate: null,
  endDate: null,
  moves: null,
  fetching: false,
  error: null
})

/* ------------- Reducers ------------- */

// request the avatar for a user
export const fetchMoves = (state, { startDate, endDate }) =>
  state.merge({ fetching: true, startDate, endDate, moves: null })

// successful avatar lookup
export const fetchSuccess = (state, action) => {
  const { moves } = action
  return state.merge({ fetching: false, error: null, moves })
}

// failed to get the avatar
export const fetchFailure = (state) =>
  state.merge({ fetching: false, error: true, moves: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_MOVES]: fetchMoves,
  [Types.FETCH_SUCCESS]: fetchSuccess,
  [Types.FETCH_FAILURE]: fetchFailure
})
