import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchMoves: null,
  fetchSuccess: ['moves'],
  fetchFailure: null,
  getMoves: null
})

export const MovesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  moves: null,
  fetching: false,
  error: null
})

/* ------------- Reducers ------------- */

// request the avatar for a user
export const fetchMoves = (state) =>
  state.merge({ fetching: true })

// successful avatar lookup
export const fetchSuccess = (state, action) => {
  const { moves } = action
  return state.merge({ fetching: false, error: null, moves })
}

// failed to get the avatar
export const fetchFailure = (state) =>
  state.merge({ fetching: false, error: true, moves: state.moves })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_MOVES]: fetchMoves,
  [Types.FETCH_SUCCESS]: fetchSuccess,
  [Types.FETCH_FAILURE]: fetchFailure
})
