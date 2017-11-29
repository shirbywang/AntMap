import React, { Component } from 'react';
import { AsyncStorage, Button, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Image from 'react-native-scalable-image';
import { NavigationActions, StackNavigator } from 'react-navigation';
import Polyline from '@mapbox/polyline';
import NightMapStyles from '../../MapStyles/NightMapStyles';
import {TOUR_DB, TOUR_ROUTES} from '../DB/RouteInfo.js';
import { styles } from '../styles.js';

const resetAction = NavigationActions.reset ({
    index: 0,
    actions: [  NavigationActions.navigate({ routeName: 'Home'})  ],
})

export class HomeScreen extends React.Component     {
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
            showsUserLocation= {true}
            zoomEnabled	= {false}
            rotateEnabled = {false}
            scrollEnabled	= {false}
            showsPointsOfInterest = {false}
            initialRegion={{
              latitude: 33.646064,
              longitude: -117.842746,
              latitudeDelta: 0.02,
              longitudeDelta: 0.016,
            }}/>
            <View style={styles.topBar}>
              <Image source={require('../DB/Photos/AntMapLogo.png')}/>
            </View>
            <View>
              <Button height='15' color='rgba(192, 192, 63, 0.45)' title= "Start A New Tour" onPress={() => navigate('List')}/>
            </View>
            <View style={styles.contentContainer}/>
            <View style={styles.botBar}/>
        </View>
    )
  }};

export class ListScreen extends React.Component     {
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

export class SummaryScreen extends React.Component  {
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

  componentDidMount() {
    this.loadTour();
  }

  async loadTour() {
    const num = await AsyncStorage.getItem('tour');
    this.setState({tour: num});
    this.setState({route: TOUR_ROUTES[num].route});
  }

  async setupTour() {
    const { navigate } = this.props.navigation;
    try {
      var r = JSON.stringify(this.state.route).replace(/^\[|]$/g,'');
      AsyncStorage.setItem('route', r)
    }
    catch (error) { console.log(error); }
    navigate('Maps');
  }


  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
          <View style={styles.topBar}>
            <Text style={styles.barText}> {TOUR_ROUTES[this.state.tour].name} Tour </Text>
          </View>
          <View style={styles.contentContainer}>
            <ScrollView style={{height:600}}>
              {this.state.route.map((prop,key) => {
              if(this.state.route[key] != 0)
              {
                return (
                  <View key={key}>
                    <View style={styles.summaryStop} >
                      <Image source={TOUR_DB[prop].picture}/>
                        <View style={styles.summaryStop}>
                          <Image source={require('../DB/Photos/backdrop.png')} style={styles.bgImage}>
                          <View style={{flexDirection: 'column',}}>
                            <Text style={styles.boldContainerText}>    Stop #{key} </Text>
                            <Text> </Text>
                            <Text style={styles.containerText}>        {TOUR_DB[prop].name} </Text>
                          </View>
                          </Image>
                        </View>
                    </View>
                    <Image source={require('../DB/Photos/sumArrow.png')}/>
                  </View>
                )
              }
              })}
              <Text style={styles.containerText}>        Tour End    </Text>
            </ScrollView>
          </View>
          <View style={styles.botBar}>
            <Button footer='0' height='15' color='rgba(192, 192, 63, 0.6)' title= "Begin this Tour" onPress={() => this.setupTour() }/>
          </View>
      </ View>
    )
  }
};

export class MapScreen extends React.Component      {
  static navigationOptions = {
    title: "Map",
    header: null,
  };

  constructor(props) {
    super(props);
    this.mapref = null;
    this.state = {
      from: {latitude: 20.000, longitude: -117.0},
      to:   {latitude: 20.000, longitude: -117.0},
      route: [],
      coords: [],

    };
  }

  componentDidMount() {
      this.loadCurrTour();
  }

  async loadCurrTour() {
    const value = await AsyncStorage.getItem('route');
    console.warn('Map',value)
    var route = value.split(',')
    this.setState({route: route });
    this.setState({from:{ latitude:TOUR_DB[parseInt(route[0])].lat , longitude: TOUR_DB[parseInt(route[0])].long,}});
    this.setState({to:  { latitude:TOUR_DB[parseInt(route[1])].lat , longitude: TOUR_DB[parseInt(route[1])].long}});
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) =>{
        let v = p.coords;
        if(route[0] == 0) {
          this.setState({from:{ latitude: v.latitude , longitude: v.longitude,}});
        }
        this.getDirections(
          JSON.stringify(this.state.from.latitude+','+this.state.from.longitude),
          JSON.stringify(this.state.to.latitude  +','+this.state.to.longitude)
        );
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      })
    };
  }

  async getDirections(startLoc, destinationLoc) {
    try {
      //console.warn(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&mode=walking`)
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

  arriveAtLandmark() {
    const { navigate } = this.props.navigation;
    AsyncStorage.setItem('destTag', this.state.route[1])
    navigate('Landmark')
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <MapView
      provider= { PROVIDER_GOOGLE }
      style= { styles.map }
      ref={(ref) => { this.mapRef = ref }}
      //onLayout = {() => this.map.fitToCoordinates(this.props.myLatLongs,{edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: false})}
      customMapStyle={ NightMapStyles }
      initialRegion={{
        latitude: 33.646064,
        longitude: -117.842746,
        latitudeDelta: 0.02,
        longitudeDelta: 0.016,}}
        >
        <MapView.Marker
        coordinate={this.state.from}
        pinColor= 'dodgerblue'
        title={"You are here"}
        />
        <MapView.Marker
        coordinate={this.state.to}
        pinColor= 'goldenrod'
        title={"Destination"}
        />
        <MapView.Polyline
        coordinates = {this.state.coords}
        strokeWidth = {2}
        strokeColor = 'dodgerblue'
        />
        </MapView>
        <View style={styles.topBar}/>
        <View style={styles.contentContainer}/>
        <View style={styles.botBar}>
        <Button height='15' width ='100' color='rgba(192, 192, 63, 0.85)' title= "I'm there!" onPress={() => this.arriveAtLandmark()}/>
        </View>
        </View>
      )
    }
  };

export class LandmarkScreen extends React.Component {
  static navigationOptions = {
    title: "Landmark",
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
        site: 0,
    };
  }

  async componentDidMount() {
    const value = await AsyncStorage.getItem('destTag');
    this.setState({site: value});
  }

  async startNextStart(){
    const { navigate } = this.props.navigation;
    const v = await AsyncStorage.getItem('route');
    var route = v.split(',').splice(1);
    route = route.map(Number);
    var s = JSON.stringify(route).replace(/^\[|]$/g,'');
    console.warn(s)
    AsyncStorage.setItem('route',s )
    if(route.length <= 1 )
    {
      navigate('End');
    }
    else {
      navigate('Maps');
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.containerText}> {TOUR_DB[this.state.site].name} </Text>
        </View>
        <View style={styles.contentContainer}>
          <Image source={TOUR_DB[this.state.site].picture}/>
          <Text style={styles.containerText}>      {TOUR_DB[this.state.site].desc} </Text>
        </View>
        <View style={styles.botBar}>
          <Button height='15' width ='100' color='rgba(192, 192, 63, 0.6)' title= "Go to the next stop!" onPress={() => this.startNextStart()}/>
        </View>
      </View>
    )
  }
};

export class EndScreen extends React.Component      {
  static navigationOptions = {
    title: "End",
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.topBar}/>
        <View style={styles.contentContainer}>
          <Button height='15' width ='100' color='rgba(192, 192, 63, 0.6)' title= "Back to the Main Screen!" onPress={() => this.props.navigation.dispatch(resetAction)}/>
        </View>
        <View style={styles.botBar}>

        </View>
      </View>
    )
  }
};
