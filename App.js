import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { TOUR_DB, TOUR_ROUTES } from './App/DB/RouteInfo.js'
import { LoadScreen, HomeScreen, SearchScreen, ListScreen,
         SummaryScreen, MapScreen, SettingScreen, LandmarkScreen, EndScreen
       } from './App/Components/Screens.js';

//Screen Navigation class
const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
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
  Landmark: {
    screen: LandmarkScreen,
    navigationOptions: {
      headerTitle: 'Landmark',
    },
  },
  End: {
    screen: EndScreen,
    navigationOptions: {
      headerTitle: 'Finish',
    },
  },
},

  { headerMode: 'screen' }
);


//Used for initial running when app is opened
export default RootNavigator;
