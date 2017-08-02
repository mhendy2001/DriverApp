import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchMoves: null,
  fetchSuccess: ['moves', 'timeSlots'],
  fetchFailure: null,
  getMoves: null,
  trackTime: null,
  updateTime: ['time'],
  updateMove: ['move'],
  moveUpdated: ['error'],
  getMove: ['id'],
  moveFetched: ['move']
})

export const MovesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

let initialTime = new Date()
export const INITIAL_STATE = Immutable({
  moves: null,
  timeSlots: null,
  fetching: false,
  error: null,
  time: initialTime,
  move: null
})

/* ------------- Reducers ------------- */

// fetch moves and timeSlots
export const fetchMoves = (state) =>
  state.merge({ fetching: true })

// moves fetched successful
export const fetchSuccess = (state, action) => {
  if (__DEV__ && console.tron) {
    console.tron.log({mesage: 'fetchSuccess', object: state})
  }
  const { moves, timeSlots } = action
  return state.merge({ fetching: false, error: null, moves: moves, timeSlots: timeSlots })
}

// failed to fetch moves will use state
export const fetchFailure = (state) =>
  state.merge({ fetching: false, error: true, moves: state.moves, timeSlots: state.timeSlots })

  // update time in the state
  export const updateTime = (state, action) => {
    const { time } = action
    return state.merge({ time: time, moves: moves, timeSlots: timeSlots })
  }

  export const moveUpdated = (state, action) => {
    const { error } = action
    return state.merge({ error: error, move: state.move, timeSlots: state.timeSlots })
  }

  export const moveFetched = (state, action) => {
    if (__DEV__ && console.tron) {
      console.tron.log({mesage: 'moveFetched', object: state})
    }
    const { move } = action
    return state.merge({ move: move })
  }

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_MOVES]: fetchMoves,
  [Types.FETCH_SUCCESS]: fetchSuccess,
  [Types.FETCH_FAILURE]: fetchFailure,
  [Types.UPDATE_TIME]: updateTime,
  [Types.MOVE_UPDATED]: moveUpdated,
  [Types.MOVE_FETCHED]: moveFetched
})
