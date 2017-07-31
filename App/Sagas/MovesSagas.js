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
