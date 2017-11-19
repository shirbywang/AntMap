import React, { Component } from 'react';
import { AsyncStorage, Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import Image from 'react-native-scalable-image';
import { StackNavigator } from 'react-navigation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import NightMapStyles from '../../MapStyles/NightMapStyles';
import Polyline from '@mapbox/polyline';
import {TOUR_DB, TOUR_ROUTES} from '../DB/RouteInfo.js'
import { styles } from '../styles.js'

//Loading Screen Class - Used for Screen #1 (Loading Screen), including navigation settings and view
export class LoadScreen extends React.Component   {
  //Used for Screen-to-screen navigation and the design of the top-bar
  static navigationOptions = {
      title: 'Loading',                 //Reference Name of Screen
      header: null,                     //null means that the top-bar is not visible
  };

  //How this screen will be rendered
  render() {
    //Required for navigation (needed in each screen class)
    const { navigate } = this.props.navigation;

    //How the page is rendered for viewing
    return (
      //Viewing Container for files (if there is more than one object, there must be a enclosing container)
      <View style={{ flex: 1, alignItems: 'center', justifyContent:'space-between', backgroundColor:'black' }}>
        <Text>         </Text>
        <Button color='dodgerblue' title= " Go to Home " onPress={() => navigate('Home')} />
        <Button title= " Go to Loading " onPress={() => navigate('Load') } />
        <Button title= " Go to Search  " onPress={() => navigate('Search') } />
        <Button title= " Go to Listing " onPress={() => navigate('List') } />
        <Button title= " Go to Summary " onPress={() => navigate('Summary') } />
        <Button title= " Go to MapScr  " onPress={() => navigate('Maps') } />
        <Button title= " Go to Setting " onPress={() => navigate('Setting') } />
        <Button title= " Go to Landmark" onPress={() => navigate('Landmark') } />
        <Text>         </Text>
      </View>
    )
  }
};
export class HomeScreen extends React.Component   {
  static navigationOptions = {
    title: "Home",
    header: null,
    };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <MapView
          provider= { PROVIDER_GOOGLE }
          style= { styles.map }
          customMapStyle={ NightMapStyles }
          initialRegion={{
            latitude: 33.646064,
            longitude: -117.842746,
            latitudeDelta: 0.010,
            longitudeDelta: 0.008,
          }}
          map
        />
        <View style={styles.body}>
          <Button height='15' color='rgba(192, 192, 63, 0.6)' title= "Start A New Tour" onPress={() => navigate('List')}/>

          <View style={styles.overlay}>
            <Button width='30' height='10' color='rgba(255,0,0,1)' title= "Debug" onPress={() => navigate('Load')}/>
          </View>
        </View>
      </View>
    )
  }
};
export class SearchScreen extends React.Component {
  static navigationOptions = { title: "Search", };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    )
  }
};
export class ListScreen extends React.Component   {
  static navigationOptions = {
    title: "Listings",
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
        tour: '0',
    };
  }

  async selectTour(choice) {
      AsyncStorage.setItem('tour', choice);
      this.props.navigation.navigate('Summary');
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.body2}>
          <View style={{flex:2,flexDirection:'column', justifyContent:'space-between', width: 150, height:50}}>
            <Text style={{color:'white',justifyContent:'center',}}>        Select a Tour </Text>
                <Button color='rgba(192, 192, 63, 0.75)' title= " Libraries " onPress={() => this.selectTour('0') } />
                <Button color='rgba(192, 192, 63, 0.75)' title= " Residences " onPress={() => this.selectTour('1') } />
                <Button color='rgba(192, 192, 63, 0.75)' title= " Social Areas " onPress={() => this.selectTour('2') } />
                <Button color='rgba(192, 192, 63, 0.75)' title= " Landmarks " onPress={() => this.selectTour('3') } />
            <Text> </Text>
          </View>
        </View>
      </View>
    )
  }
};
export class SummaryScreen extends React.Component {
  static navigationOptions = {
    title: "Summary",
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
        route: [],
    };
  }

  async loadTour() {
    const num = await AsyncStorage.getItem('tour');
    this.setState({route: TOUR_ROUTES[num].route});
  }

  async setupTour() {
    const { navigate } = this.props.navigation;
    try {
      var r = JSON.stringify(this.state.route);
      r = r.substr(1,(r.length-2));
      AsyncStorage.setItem('route', r)
    }
    catch (error) { console.log(error); }
    navigate('Maps');
  }

  componentDidMount() {
    this.loadTour();
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {this.state.route.map((prop,key) => {
            return (
              <Text key={key}> {TOUR_DB[prop].name} </Text>
            )
          })}
        </View>
        <View style={{ flex:2 }}>
          <Button footer='0' height='15' color='rgba(192, 192, 63, 0.6)' title= "Start A New Tour" onPress={() => this.setupTour() }/>
        </View>
      </View>
    )
  }
};
export class MapScreen extends React.Component {
  static navigationOptions = {
    title: "Map",
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
        from: {lat: 33.653283, long: -117.743652},
        to:   {lat: 33.653283, long: -117.743652},
        route: [],
    };
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p)=> {
        this.setState({from: {lat:p.latitude,long:p.longitude}});
      });
    } else {
      this.setState(from: {lat: 33.653283, long: -117.743652});
    }
  }
  async loadCurrTour() {
      const value = await AsyncStorage.getItem('route');
      var route = value.split(',')
      this.setState({route: route });



//Issue is here - t and setstate is not applying outside of getCurrentPosition

      if(route[0] == 0) {
          this.getLocation();
          console.warn(this.state.from.lat)
          console.warn(this.state.from.long)

      }

      //this.setState({'to':[TOUR_DB[route[1]].lat,TOUR_DB[route[1]].long]})
  }

  componentDidMount() {
    this.loadCurrTour();
  }

  render() {
    return (
        //Render a map using provided information (currently centered on Aldrich Park)
        <MapView
          provider= { PROVIDER_GOOGLE }
          style= { styles.map }
          customMapStyle={ NightMapStyles }
          initialRegion={{
            latitude: 33.646064,
            longitude: -117.842746,
            latitudeDelta: 0.015,
            longitudeDelta: 0.012,
          }}
        />
    );
  }
};

export class SettingScreen extends React.Component {
  static navigationOptions = { title: "Settings", };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    )
  }
};

export class LandmarkScreen extends React.Component {
  static navigationOptions = { title: "Landmark", };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    )
  }
};
