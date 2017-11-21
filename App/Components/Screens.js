import React, { Component } from 'react';
import { AsyncStorage, Button, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Image from 'react-native-scalable-image';
import { StackNavigator } from 'react-navigation';
import Polyline from '@mapbox/polyline';
import NightMapStyles from '../../MapStyles/NightMapStyles';

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
            />
              <View style={styles.topBar}>
                <Button height='15' color='rgba(192, 192, 63, 0.6)' title= "Start A New Tour" onPress={() => navigate('List')}/>
                <View style={styles.overlay}>
                  <Button width='30' height='10' color='rgba(255,0,0,1)' title= "Debug" onPress={() => navigate('Load')}/>
                </View>
              </View>
              <View style={styles.contentContainer}/>
              <View style={styles.botBar}/>
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
        <View style={styles.topBar}>
          <Text style={styles.barText}> Select a Tour </Text>
        </View>
        <View style={styles.body}>
          <View style={{flex:2,flexDirection:'column', justifyContent:'space-between', width: 125, height:50}}>
            <Text> </Text>
            <Button color='rgba(192, 192, 63, 0.75)' title= " Libraries " onPress={() => this.selectTour('0') } />
            <Button color='rgba(192, 192, 63, 0.75)' title= " Residences " onPress={() => this.selectTour('1') } />
            <Button color='rgba(192, 192, 63, 0.75)' title= " Social Areas " onPress={() => this.selectTour('2') } />
            <Button color='rgba(192, 192, 63, 0.75)' title= " Landmarks " onPress={() => this.selectTour('3') } />
            <Text> </Text>
          </View>
        </View>
        <View style={styles.botBar}/>
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
        tour: 0,
        route: [],
    };
  }

  async loadTour() {
    const num = await AsyncStorage.getItem('tour');
    this.setState({tour: num});
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
            <View style={styles.topBar}>
              <Text style={styles.barText}> {TOUR_ROUTES[this.state.tour].name} Tour </Text>
            </View>
            <View style={styles.contentContainer}>
              <ScrollView>
                {this.state.route.map((prop,key) => {
                if(this.state.route[key] !== 0)
                {
                  return (
                      <View key={key}>
                        <View style={styles.summaryStop} >
                          <Image source={require('../Photos/thumbnail.jpg')} style={styles.bgImage}>
                            <View style={styles.summaryStop}>
                              <Image source={require('../Photos/thumbnail.jpg')}/>
                              <View style={{flexDirection: 'column',}}>
                                <Text style={styles.containerText}> Stop #{key} </Text>
                                <Text style={styles.containerText}>  {TOUR_DB[prop].name} </Text>
                              </View>
                            </View>
                          </Image>
                        </View>
                        <Image source={require('../Photos/sumArrow.png')}/>
                      </View>
                    )
                  }
                })}
                </ScrollView>
            </View>
            <View style={styles.botBar}>
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
        from: {lat: 20.000, long: -117.0},
        to:   {lat: 20.000, long: -117.0},
        route: [],
        coords: [],
    };
  }

  componentDidMount() {
    this.loadCurrTour();
  }

  async loadCurrTour() {
      const value = await AsyncStorage.getItem('route');
      var route = value.split(',')
      this.setState({route: route });
      this.setState({from:{ lat:TOUR_DB[route[0]].lat , long: TOUR_DB[route[0]].long,}});
      this.setState({to:  { lat:TOUR_DB[route[1]].lat , long: TOUR_DB[route[1]].long}});
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((p) =>{
            let v = p.coords;
            if(route[0] == 0) {
                this.setState({from:{ lat: v.latitude , long: v.longitude,}});
            }
            //console.warn(JSON.stringify(this.state.from.lat+','+this.state.from.long))
            this.getDirections(
              JSON.stringify(this.state.from.lat+','+this.state.from.long),
              JSON.stringify(this.state.to.lat+','+this.state.to.long)
            );
          });
      }
    }

    async getDirections(startLoc, destinationLoc) {
    try {
        //console.warn(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
        let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
        let respJson = await resp.json();
        let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
        let coords = points.map((point, index) => {
            return  {
                latitude : point[0],
                longitude : point[1]
            }
        })
        this.setState({coords: coords})
        return coords
    } catch(error) {
        return error
    }
}

  arrivAtLandMark()
  {

  }

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
        />
          <View style={styles.topBar}/>
          <View style={styles.contentContainer}/>
          <View style={styles.botBar}>

            <Button height='15' width ='100' color='rgba(192, 192, 63, 0.6)' title= "I'm there!" onPress={() => navigate('List')}/>
          </View>
    </View>
  )
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
