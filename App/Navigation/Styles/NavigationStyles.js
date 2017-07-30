import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.backgroundColor
  },
  tabBar: {
    height: 54,
    paddingTop: 5,
    paddingBottom: 1,
    paddingHorizontal: 28,
    borderTopWidth: 1,
    borderTopColor: Colors.cloud,
    backgroundColor: Colors.primary
  },
  tabBarLabel: {
    ...Fonts.style.small,
    letterSpacing: 0,
    color: Colors.snow
  },
  card: {
    opacity: 1,
    backgroundColor: Colors.backgroundColor
  }
})
