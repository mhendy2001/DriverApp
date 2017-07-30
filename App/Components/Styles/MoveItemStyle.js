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
    shadowColor: Colors.redShadow,
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
  infoText: {
    flex: 1,
    paddingRight: Metrics.baseMargin
  },
  title: {
    ...Fonts.style.h6,
    color: Colors.text,
    letterSpacing: 0
  },
  name: {
    ...Fonts.style.description,
    color: Colors.lightText,
    letterSpacing: 0,
    lineHeight: 18
  },
  moreInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: Metrics.smallMargin,
    borderBottomLeftRadius: Metrics.cardRadius,
    borderBottomRightRadius: Metrics.cardRadius,
    backgroundColor: Colors.silver
  },
  details: {
    flexDirection: 'row'
  },
  detail: {
    paddingRight: Metrics.doubleBaseMargin
  },
  detailLabel: {
    ...Fonts.style.small,
    color: Colors.lightText,
    letterSpacing: 0
  },
  detailText: {
    ...Fonts.style.normal,
    color: Colors.lightText,
    letterSpacing: 0
  },
  image: {
    // width: Metrics.images.large,
    // height: Metrics.images.large,
    margin: Metrics.smallMargin,
    alignSelf: 'center'
  },
})
