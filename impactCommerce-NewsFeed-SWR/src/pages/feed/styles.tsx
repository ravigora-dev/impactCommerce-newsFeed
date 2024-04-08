// styles.ts

import {StyleSheet, TextStyle, ViewStyle, ImageStyle} from 'react-native';

interface Styles {
  container: ViewStyle;
  card: ViewStyle;
  image: ImageStyle;
  contentContainer: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  loadingText: TextStyle;
  headText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#696969',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: '90%',
    flex: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    flex: 1,
    borderRadius: 10,
  },
  contentContainer: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
  loadingText: {
    marginTop: 10,
  },
  headText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default styles;
