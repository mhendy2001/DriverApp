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
  findIndex
} from 'ramda'

// For empty lists
// import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/MovesListStyle'
import { Images } from '../Themes'
import I18n from 'react-native-i18n'
import ListGradient from '../Components/ListGradient'
import MoveItem from '../Components/MoveItem'

class MovesList extends Component {
  static navigationOptions = {
    tabBarLabel: I18n.t('Moves Schedule'),
    tabBarIcon: ({ focused }) => (
      <Image source={focused ? Images.activeScheduleIcon : Images.inactiveScheduleIcon} />
    )
  }

  constructor (props) {
    super(props)

    const { moves } = props
    const data = moves
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
    const { moves } = newProps
    this.setState({
          data: moves
        })
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
        return 140
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMoves: () => dispatch(MovesActions.getMoves())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovesList)
