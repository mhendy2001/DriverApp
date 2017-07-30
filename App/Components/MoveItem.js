import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback, LayoutAnimation, Animated } from 'react-native'
import styles from './Styles/MoveItemStyle'
import LocationInfo from './LocationInfo'
import { Images } from '../Themes'

interface MoveItemProps {
  pickupLocationStreet: string,
  pickupLocationCity: string,
  pickupLocationPostcode: string,
  pickupLocationLatitude: number,
  pickupLocationLongitude: number,
  deliveryLocationStreet: string,
  deliveryLocationCity: string,
  deliveryLocationPostcode: string,
  deliveryLocationLatitude: number,
  deliveryLocationLongitude: number,
  volume: number,
  date: Date,
  desiredTimeSlot: string,
  isFinished: boolean,
  hasReminder: boolean,
  isCurrentDay: boolean,
  isActive: boolean,
  currentTime: Date,
  isCollapsed: boolean,
  onPress (): void
}

interface MoveItemState {
  isActive: boolean,
  animatedSize: Animated.Value,
  isCollapsed: boolean
}

export default class MoveItem extends React.Component<MoveItemProps, MoveItemState> {
  constructor (props) {
    super(props)

    this.state = {
      isActive: false,
      animatedSize: new Animated.Value(1),
      isCollapsed: true
    }
  }

  handlePressIn = () => {
    Animated.spring(this.state.animatedSize, {
      toValue: 1.05,
      useNativeDriver: true
    }).start()
    if (__DEV__ && console.tron) {
      console.tron.log({mesage: 'handlePressIn', object: this.state.isCollapsed})
    }
    this.setState({isCollapsed: !this.state.isCollapsed})
  }

  handlePressOut = () => {
    Animated.spring(this.state.animatedSize, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true
    }).start()
  }

  render () {
    const {
      pickupLocationStreet,
      pickupLocationCity,
      pickupLocationPostcode,
      pickupLocationLatitude,
      pickupLocationLongitude,
      deliveryLocationStreet,
      deliveryLocationCity,
      deliveryLocationPostcode,
      deliveryLocationLatitude,
      deliveryLocationLongitude,
      volume,
      date,
      desiredTimeSlot,
      isCollapsed
    } = this.props

    if (__DEV__ && console.tron) {
      console.tron.log({mesage: 'render', object: this.props})
    }
    const animatedStyle = {
      transform: [{ scale: this.state.animatedSize }]
    }

    const containerStyles = [
      styles.container,
      styles.active,
      animatedStyle
    ]

    return (
      <View>
        <TouchableWithoutFeedback
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}
          onPress={this.props.onPress}
        >
          <Animated.View style={containerStyles}>
            <View style={styles.locations}>
              <View style={styles.location}>
                <LocationInfo
                  street={this.props.pickupLocationStreet}
                  postcode={this.props.pickupLocationPostcode}
                  city={this.props.pickupLocationCity}
                  latitude={this.props.pickupLocationLatitude}
                  longitude={this.props.pickupLocationLongitude}
                  isCollapsed={this.props.isCollapsed}
                />
              </View>
              <Image style={styles.image} source={Images.truckIcon}></Image>
              <View style={styles.location}>
                <LocationInfo
                  street={this.props.deliveryLocationStreet}
                  postcode={this.props.deliveryLocationPostcode}
                  city={this.props.deliveryLocationCity}
                  latitude={this.props.deliveryLocationLatitude}
                  longitude={this.props.deliveryLocationLongitude}
                  isCollapsed={this.props.isCollapsed}
                />
              </View>

            </View>
              <View style={styles.info}>
                <Text style={styles.name}>Volume</Text>
                {/* <Text style={styles.title}>{'${this.props.volume} ${this.props.volume} ${this.props.volume}'}</Text> */}
              </View>

          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
