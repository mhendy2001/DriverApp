import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.smallMargin,
    borderBottomLeftRadius: Metrics.cardRadius,
    borderBottomRightRadius: Metrics.cardRadius,
    backgroundColor: Colors.white
  },
  detail: {
    paddingRight: Metrics.doubleBaseMargin
  },
  detailLabel: {
    flex: 1,
    ...Fonts.style.small,
    color: Colors.lightText,
    letterSpacing: 0
  },
  detailText: {
    flex: 1,
    ...Fonts.style.normal,
    color: Colors.primary,
    letterSpacing: 0
  },
  remindMe: {
    flex: 1,
    alignItems: 'stretch'
  },
  socialButtons: {
    alignItems: 'center',
    flexDirection: 'row'
  }
})
