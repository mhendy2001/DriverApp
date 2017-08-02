export default {
  // Functions return fixtures
  getMoves: () => {
    return {
      ok: true,
      data: require('../Fixtures/moves.json')
    }
  },
  getMove: (id=null) => {
    let moves = require('../Fixtures/moves.json')
    if (id === null) {
      return moves[0]
    }
    let move = moves.find(item => {
        return item.id == id
    })
    if (move) {
      return {
        ok: true,
        data: move
      }
    }
    else {
      return {
        ok: false,
        data: null
      }
    }
  },
  getTimeSlots: () => {
    return {
      ok: true,
      data: require('../Fixtures/timeSlots.json')
    }
  },
  updateMove: (move) => {
    return {
      ok: true,
      data: move
    }
  }
}
