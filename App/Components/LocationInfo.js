import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/LocationInfoStyle'

interface LocationInfoProps {
  street: string,
  city: string,
  postcode: string,
  latitude: number,
  longitude: number
}

const LocationInfo = (props: LocationInfoProps) => {
  const { street, city, postcode, latitude, longitude } = props
  if (__DEV__ && console.tron) {
    console.tron.log({mesage: 'LocationInfo', object: props})
  }
  return (
    <View style={styles.leftContainer}>
          <Text style={styles.detailLabel}>
            {street}
          </Text>
          <Text style={styles.detailText}>
            {postcode}
          </Text>
          <Text style={styles.detailLabel}>
            {city}
          </Text>
    </View>
  )
}
export default LocationInfo
