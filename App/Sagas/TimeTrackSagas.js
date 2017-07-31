import { call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import MovesActions from '../Redux/MovesRedux'
import DebugConfig from '../Config/DebugConfig'
import Config from '../Config/AppConfig'

const updateDelay = 30000

const getCurrentTime = () => {
  let date = new Date()
    return date
}

export function * trackTime () {
  let time = yield getCurrentTime()
  yield put(MovesActions.updateTime(time))
  while (true) {
    yield call(delay, updateDelay)
    time = yield getCurrentTime()
    yield put(MovesActions.updateTime(time))
  }
}
