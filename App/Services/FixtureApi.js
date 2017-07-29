export default {
  // Functions return fixtures
  getMoves: () => {
    return {
      ok: true,
      data: require('../Fixtures/moves.json')
    }
  },
  getTimeSlots: () => {
    return {
      ok: true,
      data: require('../Fixtures/timeSlots.json')
    }
  }
}
