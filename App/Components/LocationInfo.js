import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/LocationInfoStyle'
import I18n from 'react-native-i18n'

interface LocationInfoProps {
  street: string,
  city: string,
  postcode: string,
  latitude: number,
  longitude: number,
  showDirections (): void,
  isCollapsed: boolean
}

const LocationInfo = (props: LocationInfoProps) => {
  const { street, city, postcode, latitude, longitude, isCollapsed } = props
  if (__DEV__ && console.tron) {
    console.tron.log({mesage: 'LocationInfo', object: props})
  }
  return (
    <View style={styles.container}>
          <Text style={styles.normalText}>{city}</Text>
          <Text style={styles.primaryText}>{street}</Text>
          <Text style={styles.normalText}>{postcode}</Text>
          <TouchableOpacity style={styles.showDirectionsTouchable} onPress={props.showDirections}>
            <Text style={styles.showDirectionsText}>
              {I18n.t('Show Directions')}
            </Text>
          </TouchableOpacity>
    </View>
  )
}
export default LocationInfo
