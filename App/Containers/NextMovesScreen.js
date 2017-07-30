import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/NextMoveScreenStyle'
import { Images } from '../Themes'
import I18n from 'react-native-i18n'

class NextMoveScreen extends Component {
  static navigationOptions = {
    tabBarLabel: I18n.t('Today Moves'),
    tabBarIcon: ({ focused }) => (
      <Image source={focused ? Images.activeTodayIcon : Images.inactiveTodayIcon} />
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>NextMoveScreen</Text>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NextMoveScreen)
