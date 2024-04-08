# News Feed App

## Objective

The objective of this project is to develop a single-screen news feed application using plain React Native and TypeScript. The application features a custom-made swipe control named "Swipe to fetch button," which triggers the fetching of news feed when interacted with. The implementation focuses on efficient data fetching with useSWR and comprehensive code documentation for better readability and maintainability.

### Prerequisites

- Node.js and npm installed on your system

### Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd news-feed-app`
3. Install dependencies: `npm install`


### Starting the Application

Run the application: `react-native run-android`default port denotes to 8081

### Using the Application

1. On the single screen, you will see a custom swipe control named "Swipe to fetch button."
2. Swipe the button to the right to trigger the news feed fetching.
3. Once the data is fetched, the news feed will be displayed on the screen.

## Major components

1. FeedScreen component 
2. SwipeButton componen (atom - for better reuability with custom props) 

## Coding standards 

1. components : Reusable bits of code 
2. pages: pages are the final building blocks used to create the final layout of the application and define the structure 
3. all the files and folders created lower camelCase for better readability 
4. utills created for endpoints and any js functionality addition

## Implementation Details

- The application is built using React Native and TypeScript for better type safety.
- The custom swipe control, "Swipe to fetch button," is implemented using React Native Gesture Handler library.
- Data fetching is efficiently handled using useSWR, a React Hooks library for data fetching.
- Comprehensive code documentation is provided throughout the project to enhance readability and maintainability.


## Acknowledgments

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [useSWR](https://swr.vercel.app/)
- [Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Linear Gradient React Native](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)

Feel free to customize this README as needed for your project.
