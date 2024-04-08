import {Dimensions, TextStyle, ViewStyle} from 'react-native';

interface Styles {
  swipeCont: ViewStyle;
  colorWave: ViewStyle;
  swipeable: ViewStyle;
  swipeText: TextStyle;
}

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export const BUTTON_WIDTH: number = screenWidth * 0.9;
export const BUTTON_HEIGHT: number = screenHeight * 0.1;
export const BUTTON_PADDING: number = 10;
export const SWIPEABLE_DIMENSIONS: number = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

export const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
export const H_SWIPE_RANGE =
  BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;

const styles: Styles = {
  swipeCont: {
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    backgroundColor: '#fff',
    borderRadius: BUTTON_HEIGHT,
    padding: BUTTON_PADDING,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  colorWave: {
    position: 'absolute',
    left: 0,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT,
  },
  swipeable: {
    position: 'absolute',
    left: BUTTON_PADDING,
    height: SWIPEABLE_DIMENSIONS,
    width: SWIPEABLE_DIMENSIONS,
    borderRadius: SWIPEABLE_DIMENSIONS,
    zIndex: 3,
  },
  swipeText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    zIndex: 2,
    color: '#1b9aaa',
  },
};

export default styles;
