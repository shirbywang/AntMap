import React, { Component } from 'react';
import { AsyncStorage, BackHandler, Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import Image from 'react-native-scalable-image';
import { StackNavigator } from 'react-navigation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import NightMapStyles from './MapStyles/NightMapStyles';
import Polyline from '@mapbox/polyline';

var TOUR_DB = [
  { name:'Cross Cultural Center'            , lat:33.653283, long: -117.743652, },  //00
  { name:'Aldrich Hall'                     , lat:33.648461, long: -117.840436, },  //01
  { name:'Langson Library'                  , lat:33.647067, long: -117.841051, },  //02
  { name:'Engineering Hall'                 , lat:33.643583, long: -117.841422, },  //03
  { name:'Physical Science Classroom'       , lat:33.643492, long: -117.842575, },  //04
  { name:'Ayala Science Library'            , lat:33.649421, long: -117.844023, },  //05
  { name:'Berk Hall Nursing Science'        , lat:33.64656 , long: -117.856254, },  //06
  { name:'Humanities Gateway'               , lat:33.648227, long: -117.84443 , },  //07
  { name:'Clair Trevor Theatre'             , lat:33.650742, long: -117.846335, },  //08
  { name:'Mesa Court'                       , lat:33.652979, long: -117.845317, },  //09
  { name:'Bren Events Center'               , lat:33.649411, long: -117.846964, },  //10
  { name:'Arroyo Vista'                     , lat:33.646854, long: -117.829043, },  //11
  { name:'Vista Del Campo'                  , lat:33.640441, long: -117.824051, },  //12
  { name:'Anteater Recreation Center (ARC)' , lat:33.643361, long: -117.827945, },  //13
  { name:'Middle Earth'                     , lat:33.64465 , long: -117.837548, },  //14
  { name:'Infinity Fountain'                , lat:33.644684, long: -117.843529, },  //15
  { name:'Student Center'                   , lat:33.648811, long: -117.842411, },  //16
  { name:'Brian Pellar Sculpture'           , lat:33.648461, long: -117.840836, },  //17
  { name:'Laurel L. Wilkening Rose Garden'  , lat:33.648461, long: -117.840836, },  //18
  { name:'UCI Flagpoles'                    , lat:33.648018, long: -117.840836, },  //19
];

var TOUR_ROUTES = [
  { name: "Libraries"    ,route: [2,5]},                 //0
  { name: "Residences"   ,route: [9,11,12,14]},          //1
  { name: "Social Areas" ,route: [0,8,10,13,16]},        //2
  { name: "Landmarks"    ,route: [10,15,16,17,18,19]},   //3
]

/*
  !!!Note: PLEASE SEE LOADSCREEN CLASS FOR CLASS-BASED COMMENTS (SIMILAR FOR ALL SCREEN CLASSES)!!!
*/

//Loading Screen Class - Used for Screen #1 (Loading Screen), including navigation settings and view
class LoadScreen extends React.Component   {
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
class HomeScreen extends React.Component   {
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
class SearchScreen extends React.Component {
  static navigationOptions = { title: "Search", };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    )
  }
};
class ListScreen extends React.Component   {
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

  selectTour(choice) {
      AsyncStorage.setItem('tour',JSON.stringify(choice));
      this.props.navigation.navigate('Summary');
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.body2}>
          <View style={{flex:2,flexDirection:'column', justifyContent:'space-between', width: 150, height:50}}>
            <Text style={{color:'white',justifyContent:'center',}}>        Select a Tour </Text>
                <Button color='rgba(192, 192, 63, 0.75)' title= " Libraries " onPress={() => this.selectTour(0) } />
                <Button color='rgba(192, 192, 63, 0.75)' title= " Residences " onPress={() => this.selectTour(1) } />
                <Button color='rgba(192, 192, 63, 0.75)' title= " Social Areas " onPress={() => this.selectTour(2) } />
                <Button color='rgba(192, 192, 63, 0.75)' title= " Landmarks " onPress={() => this.selectTour(3) } />
            <Text> </Text>
          </View>
        </View>
      </View>
    )
  }
};
class SummaryScreen extends React.Component {
  static navigationOptions = {
    title: "Summary",
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
        tour: '0',
    };
  }

  componentDidMount() {
      AsyncStorage.getItem('tour').then((value) => { this.setState({'tour': value}) }).done();

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> {this.state.tour} </Text>
      </View>
    )
  }
};
class MapScreen extends React.Component {
  static navigationOptions = {
    title: "Map",
    header: null,
  };

  render() {
    return (
        //Render a map using provided information (currently centered on Aldrich Park)
        <MapView
          provider= { PROVIDER_GOOGLE }
          style= { styles.map }
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
class SettingScreen extends React.Component {
  static navigationOptions = { title: "Settings", };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    )
  }
};
class LandmarkScreen extends React.Component {
  static navigationOptions = { title: "Landmark", };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    )
  }
};

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
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      headerTitle: 'Searching',
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

//Style Sheets for other classes (can be referred in style section of each object, such as map for mapstyle)
const styles = StyleSheet.create({

  container: {
    flex:1,
    backgroundColor: 'black',
  },

  overlay: {
    flex: 1,
    position: 'absolute',
  },

  body: {
    flex: 2,
  },

  body2: {
    flex: 2,
    alignItems: 'center',
  },

  header: {
    flex:1,
  },

  footer: {
    flex: 2,
    bottom: 0,
  },

  backgroundImage: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'black',
    alignItems: 'center',
  },

  titleWrapper: {

  },

  inputWrapper: {

  },

  contentContainer: {
    flex: 1
  },

  footer: {
    height: 35
  },

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  map2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  logoBar: {
    backgroundColor: 'gold',
    height: 50,
    alignItems:'center',
  },

  iconBar: {
    alignItems:'center',
    height: 25,
    backgroundColor: 'black',
  },

  debugText: {
    color: 'white',
    fontWeight: 'bold',
  },

  buttonStyle: {

  }
})
