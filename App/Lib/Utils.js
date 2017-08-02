import { Linking } from 'react-native'
import {
  merge,
  groupWith,
  contains,
  assoc,
  map,
  sum,
  findIndex,
  propEq
} from 'ramda'


const openMaps = (latitude, longitude) => {
  let location = latitude + ',' + longitude
  const googleMaps = `comgooglemaps://?daddr=${location}`
  const appleMaps = `http://maps.apple.com?daddr=${location}`

  Linking.canOpenURL(googleMaps).then((supported) => {
    if (supported) {
      Linking.openURL(googleMaps)
    } else {
      Linking.canOpenURL(appleMaps).then((supported) =>
        supported
        ? Linking.openURL(appleMaps)
        : window.alert('Unable to find maps application.')
      )
    }
  })
}

const timeSlotIndex = (id, timeSlots) => findIndex(propEq('id', id), timeSlots)

const mergeMovesTimeSlot = (timeSlots, moves) => {
  if (!moves) {
    return null
  }
  let newMoves =  moves.map(function(move){
    var index = timeSlotIndex(move.desired_time_slot, timeSlots)
    var timeSlot = null
    var formattedTime = null
    var newMove = move
    if (index > -1) {
      timeSlot = timeSlots[index]
      formattedTime = timeSlot.name + ' ( ' + timeSlot.start_time + ' - ' + timeSlot.end_time + ' )'
    }
    newMove = move.merge({desired_time_slot: formattedTime, date: Date.parse(newMove.date)})
    return newMove
  })
  return newMoves
}

const mergeMoveTimeSlot = (timeSlots, move) => {
  if (__DEV__ && console.tron) {
    console.tron.log({mesage: 'Utils: mergeMoveTimeSlot', object: timeSlots})
  }
  if (typeof move === "undefined" || !move || typeof timeSlots === "undefined") {
    return null
  }
    var index = timeSlotIndex(move.desired_time_slot, timeSlots)
    var timeSlot = null
    var formattedTime = null
    if (index > -1) {
      timeSlot = timeSlots[index]
      formattedTime = timeSlot.name + ' ( ' + timeSlot.start_time + ' - ' + timeSlot.end_time + ' )'
    }
    return move.merge({desired_time_slot: formattedTime, date: Date.parse(move.date)})
}

export default {
  openMaps,
  timeSlotIndex,
  mergeMovesTimeSlot,
  mergeMoveTimeSlot
}
