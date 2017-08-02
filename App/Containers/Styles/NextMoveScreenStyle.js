import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  label: {
    flex: 1,
    justifyContent: 'center',
    color: Colors.text
  }

})
