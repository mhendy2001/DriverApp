import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import MovesActions from '../Redux/MovesRedux'

export function * getMoves (api, action) {
  const { startDate, endDate } = action
  // make the call to the api
  const response = yield call(api.getMoves, startDate, endDate)

  if (response.ok) {
    // do data conversion here if needed
    const moves = path(['data'], response)
    yield put(MovesActions.fetchSuccess(moves))
  } else {
    yield put(MovesActions.fetchFailure())
  }
}
