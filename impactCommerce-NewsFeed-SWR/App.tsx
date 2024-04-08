import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FeedScreen from './src/pages/feed/feedPage';
import SwipeButton from './src/components/customSwiper/swiper';
import {WELCOME_TEXT} from './src/utils/strings';

// App component definition
function App(): React.JSX.Element {
  // State variable to manage whether to show the first page or not
  const [firstPage, setpage] = useState(true);

  // Function to toggle between first page and second page
  const onToggle = () => {
    setpage(false);
  };

  return (
    // Root component for Gesture Handler
    <GestureHandlerRootView style={styles.container}>
      {/* Conditional rendering based on the state value */}
      {firstPage ? (
        // Rendering the first page
        <View style={styles.center}>
          {/* Welcome message */}
          <Text style={styles.welcomeText}>{WELCOME_TEXT}</Text>
          {/* Swipe button component */}
          <SwipeButton onToggle={onToggle} />
        </View>
      ) : (
        // Rendering the Operator component when firstPage is false
        <FeedScreen />
      )}
    </GestureHandlerRootView>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1b9aaa',
  },
});

export default App;
