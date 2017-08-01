import React, { Component } from 'react'
import { AppState, View, Text, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'
import MovesActions from '../Redux/MovesRedux'
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

// Styles
import styles from './Styles/MovesListStyle'
import { Images } from '../Themes'
import I18n from 'react-native-i18n'
import ListGradient from '../Components/ListGradient'
import MoveItem from '../Components/MoveItem'
import { format } from 'date-fns'


const timeSlotIndex = (id, timeSlots) => findIndex(propEq('id', id), timeSlots)

class MovesList extends Component {
  static navigationOptions = {
    tabBarLabel: I18n.t('Moves Schedule'),
    tabBarIcon: ({ focused }) => (
      <Image source={focused ? Images.activeScheduleIcon : Images.inactiveScheduleIcon} />
    )
  }


  constructor (props) {
    super(props)

    const { moves, timeSlots, currentTime } = props
    const data = this._mergeTimeSlot(timeSlots, moves)
    const appState = AppState.currentState

    this.state = {data, appState}
  }

  componentDidMount () {
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  componentWillReceiveProps (newProps) {
    if (__DEV__ && console.tron) {
      console.tron.log({mesage: 'componentWillReceiveProps', object: newProps})
    }
    const { moves, timeSlots, currentTime } = newProps
    this.setState({
          data: this._mergeTimeSlot(timeSlots, moves)
        })
  }

  onPress = (item) => {

  }

  _mergeTimeSlot = (timeSlots, moves) => {
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

  _handleAppStateChange = (nextAppState) => {
    const { appState } = this.state
    if (__DEV__ && console.tron) {
      console.tron.log('_handleAppStateChange')
    }
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      this.props.getMoves()
    }
    this.setState({appState: nextAppState})
  }

  getItemLayout = (data, index) => {
    const item = data[index]
    const itemLength = (item, index) => {
        return 160
    }
    const length = itemLength(item)
    const offset = sum(data.slice(0, index).map(itemLength))
    return { length, offset, index }
  }

  // if value exists, create the function calling it, otherwise false
  funcOrFalse = (func, val) => val ? () => func.call(this, val) : false

  renderItem = ({item}) => {
    if (__DEV__ && console.tron) {
      console.tron.log({mesage: 'renderItem', object: item})
    }
    const isActive = true
    const isFinished = false

      return (
        <MoveItem
          volume={item.volume}
          date={item.date}
          desiredTimeSlot={item.desired_time_slot}
          pickupLocationStreet={item.pickup_location.street}
          pickupLocationCity={item.pickup_location.city}
          pickupLocationPostcode={item.pickup_location.post_code}
          pickupLocationLatitude={item.pickup_location.latitude}
          pickupLocationLongitude={item.pickup_location.longitude}
          deliveryLocationStreet={item.delivery_location.street}
          deliveryLocationCity={item.delivery_location.city}
          deliveryLocationPostcode={item.delivery_location.post_code}
          deliveryLocationLatitude={item.delivery_location.latitude}
          deliveryLocationLongitude={item.delivery_location.longitude}
          onPress={() => this.onPress(item)}
        />
      )
  }

  render () {
    const { data } = this.state
    if (__DEV__ && console.tron) {
      console.tron.log({mesage: 'render', object: this.state})
    }
    return (
      <View style={styles.container}>
        <FlatList
          ref='movesList'
          data={data}
          extraData={this.props}
          renderItem={this.renderItem}
          keyExtractor={(item, idx) => item.id}
          contentContainerStyle={styles.listContent}
          getItemLayout={this.getItemLayout}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  if (__DEV__ && console.tron) {
    console.tron.log({mesage: 'mapStateToProps', object: state})
  }
  return {
        moves: state.moves.moves,
        timeSlots: state.moves.timeSlots,
        currentTime: new Date(state.moves.currentTime)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMoves: () => dispatch(MovesActions.getMoves())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovesList)
