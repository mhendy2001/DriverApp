import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { MovesTypes } from '../Redux/MovesRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getMoves } from './MovesSagas'
import { trackTime } from './TimeTrackSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(MovesTypes.TRACK_TIME, trackTime),    

    // some sagas receive extra parameters in addition to an action
    takeLatest(MovesTypes.GET_MOVES, getMoves, api)
  ]
}
