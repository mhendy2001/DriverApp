import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  AppState,
  Image } from 'react-native'
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
import Utils from '../Lib/Utils'

// Styles
import styles from './Styles/NextMoveScreenStyle'
import { Images } from '../Themes'
import I18n from 'react-native-i18n'
import ListGradient from '../Components/ListGradient'
import MoveItem from '../Components/MoveItem'
import { format } from 'date-fns'

class NextMoveScreen extends Component {
  static navigationOptions = {
    tabBarLabel: I18n.t('Today Moves'),
    tabBarIcon: ({ focused }) => (
      <Image source={focused ? Images.activeTodayIcon : Images.inactiveTodayIcon} />
    )
  }

  constructor (props) {
    super(props)

    if (__DEV__ && console.tron) {
      console.tron.log({mesage: 'NextMoveScreen: constructor', object: props})
    }

    const { move, timeSlots } = props
    const appState = AppState.currentState

    this.state = {move: Utils.mergeMoveTimeSlot(timeSlots, move), appState}

  }


  componentDidMount () {
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  componentWillReceiveProps (newProps) {
    if (__DEV__ && console.tron) {
      console.tron.log({mesage: 'NextMoveScreen: componentWillReceiveProps', object: newProps})
    }
    const { move, timeSlots } = newProps
    this.setState({
          move: Utils.mergeMoveTimeSlot(timeSlots, move)
        })
  }

  _handleAppStateChange = (nextAppState) => {
    const { appState } = this.state
    if (__DEV__ && console.tron) {
      console.tron.log('_handleAppStateChange')
    }
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      this.props.getMove()
    }
    this.setState({appState: nextAppState})
  }

  onMoveActionPressed = (move) => {
    if (move.status === 'scheduled') {
          let newMove = move.merge({status: 'started'})
          if (__DEV__ && console.tron) {
            console.tron.log({mesage: 'NextMoveScreen: onMoveActionPressed', object: newMove})
          }
          this.props.updateMove(newMove)
          this.setState({
            move: newMove
          })
    }
    else if (move.status === 'started') {
      let newMove = move.merge({status: 'finished'})
      this.props.updateMove(newMove)
    }
    else {
        //finished should be removed from list and kept in history which has no start/finish button
        //We are doing nothing here
    }
  }

  render () {
    if (__DEV__ && console.tron) {
      console.tron.log({mesage: 'NextMoveScreen: componentWillReceiveProps', object: this.state})
    }

    const {move} = this.state
    let item = move
    if (typeof item === "undefined" || item === null) {
      return (
        <ListGradient style={styles.container}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}> I18n.t('No Move found') </Text>
          </View>
      </ListGradient>
      )
    }
    return (
      <ListGradient style={styles.container}>
        <ScrollView style={styles.container}>
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
            onMoveActionPressed={() => this.onMoveActionPressed(item)}
            isStarted={item.status==='started'}
          />
        </ScrollView>
      </ListGradient>
    )
  }
}

const mapStateToProps = (state) => {
  if (__DEV__ && console.tron) {
    console.tron.log({mesage: 'NextMoveScreen: mapStateToProps', object: state.moves.move})
  }
  return {
    move: state.moves.move,
    timeSlots: state.moves.timeSlots
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMove: (move) => {
      if (__DEV__ && console.tron) {
        console.tron.log({mesage: 'NextMoveScreen: mapDispatchToProps', object: move})
      }
      dispatch(MovesActions.updateMove(move))
    },
    getMove: () => dispatch(MovesActions.getMove())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NextMoveScreen)
