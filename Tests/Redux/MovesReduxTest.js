import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/MovesRedux'

test('request', () => {
  const startDate = null
  const endDate = null
  const state = reducer(INITIAL_STATE, Actions.fetchMoves(startDate, endDate))

  expect(state.fetching).toBe(true)
})

test('success', () => {
  const moves = '../../App/Fixtures/moves.json'
  const state = reducer(INITIAL_STATE, Actions.fetchSuccess(moves))

  expect(state.fetching).toBe(false)
  expect(state.error).toBeNull()
})

test('failure', () => {
  const state = reducer(INITIAL_STATE, Actions.fetchFailure())

  expect(state.fetching).toBe(false)
  expect(state.error).toBe(true)
  expect(state.moves).toBeNull()
})
