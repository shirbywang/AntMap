import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { TOUR_DB, TOUR_ROUTES } from './App/DB/RouteInfo.js'
import { LoadScreen, HomeScreen, SearchScreen, ListScreen,
         SummaryScreen, MapScreen, SettingScreen, LandmarkScreen
       } from './App/Components/Screens.js';

//Screen Navigation class
const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
  Load: {
    screen: LoadScreen,
    navigationOptions: {
      headerTitle: 'Loading...',
    },
  },
  List: {
    screen: ListScreen,
    navigationOptions: {
      headerTitle: 'Listing',
    },
  },
  Summary: {
    screen: SummaryScreen,
    navigationOptions: {
      headerTitle: 'Summary',
    },
  },
  Maps: {
    screen: MapScreen,
    navigationOptions: {
      headerTitle: 'Map',
    },
  },
  Setting: {
    screen: SettingScreen,
    navigationOptions: {
      headerTitle: 'Settings',
    },
  },
  Landmark: {
    screen: LandmarkScreen,
    navigationOptions: {
      headerTitle: 'Landmark',
    },
  },
},
  { headerMode: 'screen' }
);

//Used for initial running when app is opened
export default RootNavigator;
