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
import Utils from '../Lib/Utils'

// Styles
import styles from './Styles/MovesListStyle'
import { Images } from '../Themes'
import I18n from 'react-native-i18n'
import ListGradient from '../Components/ListGradient'
import MoveItem from '../Components/MoveItem'
import { format } from 'date-fns'


class MovesList extends Component {
  static navigationOptions = {
    tabBarLabel: I18n.t('Moves Schedule'),
    tabBarIcon: ({ focused }) => (
      <Image source={focused ? Images.activeScheduleIcon : Images.inactiveScheduleIcon} />
    )
  }


  constructor (props) {
    super(props)
    if (__DEV__ && console.tron) {
      console.tron.log({mesage: 'constructor', object: props})
    }
    const { moves, timeSlots, currentTime } = props
    const data = Utils.mergeMovesTimeSlot(timeSlots, moves)
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
          data: Utils.mergeMovesTimeSlot(timeSlots, moves)
        })
  }

  onPress = (item) => {

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

  renderItem = ({item}) => {
      return (
        <MoveItem
          volume={item.volume}
          date={item.date_display}
          desiredTimeSlot={item.desired_time_slot_display}
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
          isActive={item.status!=='scheduled'}
        />
      )
  }

  render () {
    const { data } = this.state
    return (
      <ListGradient style={styles.container}>
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
      </ListGradient>
    )
  }
}

const mapStateToProps = (state) => {
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
