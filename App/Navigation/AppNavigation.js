import { TabNavigator, TabBarBottom } from 'react-navigation'
import NextMovesScreen from '../Containers/NextMovesScreen'
import MovesList from '../Containers/MovesList'
// import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'
import { Colors } from '../Themes/'

// Manifest of possible screens
// const PrimaryNav = StackNavigator({
//   LaunchScreen: { screen: LaunchScreen }
// }, {
//   // Default config for all screens
//   headerMode: 'none',
//   initialRouteName: 'LaunchScreen',
//   navigationOptions: {
//     headerStyle: styles.header
//   }
// })

const TabNav = TabNavigator({
  NextMoves: { screen: NextMovesScreen },
  AllMoves: { screen: MovesList }
}, {
  key: 'Today',
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  headerMode: 'none',
  initialRouteName: 'NextMoves',
  tabBarOptions: {
    style: styles.tabBar,
    labelStyle: styles.tabBarLabel,
    activeTintColor: Colors.white,
    inactiveTintColor: Colors.white
  }
})

export default TabNav
