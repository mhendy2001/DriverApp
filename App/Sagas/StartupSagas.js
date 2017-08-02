import { put, select } from 'redux-saga/effects'
import MovesActions from '../Redux/MovesRedux'
import { is } from 'ramda'

// exported to make available for tests
export const movesList = (state) => state.moves.moves

// process STARTUP actions
export function * startup (action) {
  if (__DEV__ && console.tron) {
    // straight-up string logging
    console.tron.log('Hello, I\'m an example of how to log via Reactotron.')

    // logging an object for better clarity
    console.tron.log({
      message: 'pass objects for better logging',
      someGeneratorFunction: movesList
    })

    // fully customized!
    const subObject = { a: 1, b: [1, 2, 3], c: true }
    subObject.circularDependency = subObject // osnap!
    console.tron.display({
      name: '🔥 IGNITE 🔥',
      preview: 'You should totally expand this',
      value: {
        '💃': 'Welcome to the future!',
        subObject,
        someInlineFunction: () => true,
        someGeneratorFunction: startup,
        someNormalFunction: movesList
      }
    })
  }
  //start tracking time
  // yield put(MovesActions.trackTime())

  yield put(MovesActions.getMove(null))

  const moves = yield select(movesList)
  // only get if we don't have it yet
  if (!is(String, moves)) {
    yield put(MovesActions.getMoves())
  }
}
