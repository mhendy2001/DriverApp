import { TextStyle, ViewStyle } from 'react-native'
import { Colors, Fonts } from '../../Themes/'

interface MoveActionButtonStyleType {
  inactiveButton: ViewStyle,
  activeButton: ViewStyle,
  inactiveIcon: ViewStyle,
  activeIcon: ViewStyle,
  inactiveText: TextStyle,
  activeText: TextStyle
}

const MoveActionButtonStyle: MoveActionButtonStyleType = {
  inactiveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 100,
    backgroundColor: Colors.clear,
    height: 34
  },
  activeButton: {
    backgroundColor: Colors.primary
  },
  inactiveIcon: {
    marginRight: 7
  },
  activeIcon: {
    marginRight: 7
  },
  inactiveText: {
    ...Fonts.style.normal,
    color: Colors.primary
  },
  activeText: {
      color: Colors.lightText,
  }
}

export default MoveActionButtonStyle
