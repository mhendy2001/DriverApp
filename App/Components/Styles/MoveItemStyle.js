import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    // width: Metrics.screenWidth,
    flex: 1,
    // flexGrow:1,
    alignItems: 'stretch',
    padding: Metrics.smallMargin,
    marginVertical: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    backgroundColor: Colors.snow
  },
  active: {
    borderRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 5,
    shadowColor: Colors.highlight,
    shadowOpacity: 1
  },
  finished: {
    opacity: 0.7
  },
  locations: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Metrics.smallMargin,
    borderTopLeftRadius: Metrics.cardRadius,
    borderTopRightRadius: Metrics.cardRadius,
    backgroundColor: Colors.snow
  },
  location: {
    flex: 0.4
  },
  moreInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: Metrics.smallMargin,
    borderBottomLeftRadius: Metrics.cardRadius,
    borderBottomRightRadius: Metrics.cardRadius,
    backgroundColor: Colors.silver
  },
  moreInfoLeft: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  moreInfoRight: {
    flex: 0.3,
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  label: {
    ...Fonts.style.small,
    color: Colors.lightText,
    letterSpacing: 0
  },
  timeText: {
    ...Fonts.style.normal,
    color: Colors.primary,
    letterSpacing: 0
  },
  volumeText: {
    ...Fonts.style.normal,
    color: Colors.lightText,
    letterSpacing: 0
  },
  image: {
    margin: Metrics.smallMargin,
    alignSelf: 'center',
    flex: 0.1
  },
  actionButton: {
    flex: 1,
    alignItems: 'stretch'
  },
})
