import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  interpolateColor,
  runOnJS,
} from 'react-native-reanimated';
import {SWIPE_TEXT} from '../../utils/strings';
import styles, {
  BUTTON_WIDTH,
  BUTTON_PADDING,
  SWIPEABLE_DIMENSIONS,
  H_WAVE_RANGE,
  H_SWIPE_RANGE,
} from './styles';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

// Interface for props of SwipeButton component
interface SwipeButtonProps {
  onToggle: () => void;
}

const SwipeButton: React.FC<SwipeButtonProps> = ({onToggle}) => {
  // Shared value to track the position of the swipeable button
  const X = useSharedValue(0);
  // State to track the toggled state of the button
  const [toggled, setToggled] = useState<boolean>(false);

  // Callback function to handle toggle state change
  const handleComplete = (isToggled: boolean) => {
    if (isToggled !== toggled) {
      console.log('user swiped');
      setToggled(isToggled);
      onToggle();
    }
  };

  // Gesture handler for swipe interaction
  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.completed = toggled;
    },
    onActive: (e, ctx) => {
      let newValue;
      if (ctx.completed) {
        newValue = H_SWIPE_RANGE + e.translationX;
      } else {
        newValue = e.translationX;
      }

      // Allowing swipe within valid range
      if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
        X.value = newValue;
      }
    },
    onEnd: () => {
      if (X.value === 0) {
        return;
      } else if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
        X.value = withSpring(0);
        runOnJS(handleComplete)(false);
      } else if (
        X.value >= BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2 &&
        X.value <= H_SWIPE_RANGE
      ) {
        X.value = withSpring(H_SWIPE_RANGE);
        runOnJS(handleComplete)(true);
      } else {
        X.value = withSpring(0);
      }
    },
  });

  // Interpolated styles based on swipe position
  const InterpolateXInput = [0, H_SWIPE_RANGE];
  const AnimatedStyles = {
    swipeCont: useAnimatedStyle(() => {
      return {};
    }),
    colorWave: useAnimatedStyle(() => {
      return {
        width: H_WAVE_RANGE + X.value,
        opacity: interpolate(X.value, InterpolateXInput, [0, 1]),
      };
    }),
    swipeable: useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          X.value,
          [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING],
          ['#06d6a0', '#fff'],
        ),
        transform: [{translateX: X.value}],
      };
    }),
    swipeText: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          InterpolateXInput,
          [0.7, 0],
          Extrapolate.CLAMP,
        ),
        transform: [
          {
            translateX: interpolate(
              X.value,
              InterpolateXInput,
              [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS],
              Extrapolate.CLAMP,
            ),
          },
        ],
      };
    }),
  };

  // Rendering the SwipeButton component
  return (
    <Animated.View style={[styles.swipeCont, AnimatedStyles.swipeCont]}>
      <AnimatedLinearGradient
        style={[AnimatedStyles.colorWave, styles.colorWave]}
        colors={['#06d6a0', '#1b9aaa']}
        start={{x: 0.0, y: 0.5}}
        end={{x: 1, y: 0.5}}
      />
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <Animated.View style={[styles.swipeable, AnimatedStyles.swipeable]} />
      </PanGestureHandler>
      <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
        {SWIPE_TEXT}
      </Animated.Text>
    </Animated.View>
  );
};

export default SwipeButton;
