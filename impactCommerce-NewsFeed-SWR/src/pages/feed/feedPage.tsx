/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useMemo, useState} from 'react';
import {ActivityIndicator, Animated, Image, Text, View} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import useSWR from 'swr';
import SwipeButton from '../../components/customSwiper/swiper';
import styles from './styles';
import {NEWS_FEED_API_URL} from '../../utils/constants';
import {ERROR_TEXT, LOADING, NEWS_FEED} from '../../utils/strings';

interface Article {
  title: string;
  description: string;
  urlToImage: string;
}

const fetcher = (...args: any[]) => fetch(...args).then(res => res.json());

const FeedScreen: React.FC = () => {
  const {data, error} = useSWR<{articles: Article[]}>(
    NEWS_FEED_API_URL,
    fetcher,
  ); // Fetch data using SWR hook
  const [currentIndex, setCurrentIndex] = useState<number>(0); // State to keep track of current news index
  const [loadingImage, setLoadingImage] = useState<boolean>(false); // State to manage image loading status
  const [animating, setAnimating] = useState<boolean>(true); // State to manage animation status

  // Callback function to handle image load start event
  const onLoadStart = () => {
    setLoadingImage(true); // Set loading image status to true
    setAnimating(true); // Set animation status to true
  };

  // Callback function to handle image load end event
  const onLoadEnd = () => {
    setLoadingImage(false); // Set loading image status to false
    setAnimating(false); // Set animation status to false
  };

  // Callback function to load next feed news
  const handleNext = useCallback(() => {
    setAnimating(true); // Set animation status to true
    setCurrentIndex(currentIndex + 1); // Increment current index to load next news
  }, [currentIndex]);

  // Animated value for translateY animation
  const translateY = useMemo(() => new Animated.Value(0), []);

  // Event handler for pan gesture
  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationY: translateY}}],
    {useNativeDriver: true},
  );

  // Event handler for gesture state change
  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      // Transition effect when gesture ends
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  // Conditional rendering for error scenario
  if (error) {
    return (
      <View>
        <Text>{ERROR_TEXT}</Text>
      </View>
    );
  }

  //To handle loading scenerio
  if (!data) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>{LOADING}</Text>
      </View>
    );
  }

  const currentItem = data.articles[currentIndex];

  return (
    //To handle success scenerio
    <View style={styles.container}>
      <Text style={styles.headText}>{NEWS_FEED}</Text>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{translateY: translateY}],
              opacity: animating ? 0 : 1,
            },
          ]}>
          <Image
            source={{uri: currentItem?.urlToImage}}
            style={styles.image}
            onLoadStart={onLoadStart}
            onLoadEnd={onLoadEnd}
          />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{currentItem.title}</Text>
            <Text style={styles.description}>{currentItem.description}</Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
      {!loadingImage && <SwipeButton onToggle={handleNext} />}
    </View>
  );
};

export default FeedScreen;
