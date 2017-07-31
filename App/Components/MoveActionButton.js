import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Images } from '../Themes'
import styles from './Styles/MoveActionButtonStyle'

interface MoveActionProps {
  on: boolean,
  activeText: string,
  activeIcon: ImageSourcePropType,
  inactiveText: string,
  inactiveIcon: ImageSourcePropType,
  onPress (): void
}

const MoveActionButton = (props: MoveActionProps) => {
  const { activeText, inactiveText, activeIcon, inactiveIcon, onPress, on } = props
  const icon = on ? activeIcon : inactiveIcon
  const buttonText = on ? activeText : inactiveText

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.inactiveButton, on && styles.activeButton]}>
        <Image source={icon} style={[styles.inactiveIcon, on && styles.activeIcon]} />
        <Text style={[styles.inactiveText, on && styles.activeText]}>
          {buttonText}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default MoveActionButton
