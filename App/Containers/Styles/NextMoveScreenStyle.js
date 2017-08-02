import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  label: {
    ...Fonts.style.h4,
    flexDirection: 'column',
    textAlign: 'center',
    color: Colors.snow,
  },
  labelView: {
    alignItems: 'center',
    justifyContent: 'center',
  }

})
