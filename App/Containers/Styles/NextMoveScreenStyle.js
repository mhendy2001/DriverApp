import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  label: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    color: Colors.text
  },
  labelView: {
    flex: 1,
    alignItems: 'center'
  }

})
