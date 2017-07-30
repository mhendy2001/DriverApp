import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/LocationInfoStyle'

interface LocationInfoProps {
  street: string,
  city: string,
  postcode: string,
  latitude: number,
  longitude: number,
  isCollapsed: boolean
}

const LocationInfo = (props: LocationInfoProps) => {
  const { street, city, postcode, latitude, longitude, isCollapsed } = props
  if (__DEV__ && console.tron) {
    console.tron.log({mesage: 'LocationInfo', object: props})
  }
  return (
    <View style={styles.container}>
          {
            !isCollapsed && <Text style={styles.normalText}>{city}</Text>
          }
          <Text style={styles.primaryText}>
            {street}
          </Text>
          <Text style={styles.normalText}>
            {postcode}
          </Text>
    </View>
  )
}
export default LocationInfo
