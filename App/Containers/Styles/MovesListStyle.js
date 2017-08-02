import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    width: '100%',
    backgroundColor: Colors.transparent
  },
  row: {
    flex: 1,
    backgroundColor: Colors.snow,
    marginVertical: Metrics.smallMargin
  },
  boldLabel: {
    fontWeight: 'bold',
    color: Colors.text
  },
  label: {
    color: Colors.text
  },
  listContent: {
    backgroundColor: Colors.transparent,
    paddingTop: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.baseMargin * 8
  }
})
