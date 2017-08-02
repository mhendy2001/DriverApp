import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import MovesActions from '../Redux/MovesRedux'

export function * getMoves (api, action) {

  // To Do: optimize these calls by adding timeSlots to same response of movesResponse in the backend
  const timeSlotsResponse = yield call(api.getTimeSlots)
  const movesResponse = yield call(api.getMoves)

  if (timeSlotsResponse.ok && movesResponse.ok) {
    // do data conversion here if needed
    const moves = path(['data'], movesResponse)
    const timeSlots = path(['data'], timeSlotsResponse)
    yield put(MovesActions.fetchSuccess(moves, timeSlots))
  } else {
    yield put(MovesActions.fetchFailure())
  }
}

export function * updateMove (api, action) {
  const { move } = action
  const postMoveResponse = yield call(api.updateMove, move)

  if (postMoveResponse.ok) {
    yield put(MovesActions.moveUpdated(move))
  } else {
    yield put(MovesActions.moveUpdated(postMoveResponse.problem))
  }
}

export function * getMove (api, action) {
  const { id } = action
  const getMoveResponse = yield call(api.getMove,id)
  if (getMoveResponse.ok) {
    const moves = path(['data'], getMoveResponse)
    const move = path(['0'], moves)
    yield put(MovesActions.moveFetched(move))
  } else {
    yield put(MovesActions.moveFetched(null))
  }
}

export function * removeMove (api, action) {
  const { id } = action
  const removeMoveResponse = yield call(api.removeMove,id)
  if (removeMoveResponse.ok) {
    yield getMove(api, {id: null})
  } else {
    yield put(MovesActions.moveFetched(null))
  }
}
