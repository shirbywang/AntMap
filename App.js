import React, { Component } from 'react';
import { Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Polyline from '@mapbox/polyline';

/*
  !!!Note: PLEASE SEE LOADSCREEN CLASS FOR CLASS-BASED COMMENTS (SIMILAR FOR ALL SCREEN CLASSES)!!!
*/

//Loading Screen Class - Used for Screen #1 (Loading Screen), including navigation settings and view
class LoadScreen extends React.Component {
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'goldenrod' }}>
        <Image
              style={{width: 200, height: 75}}
              source={{uri: 'https://lh3.googleusercontent.com/UKHz9AkBFV-a5c1TTRgvG8jk5YVjpOQX77vRYoFhT_ZAaZk487uvHznvSHWP4okpM6FOKNML_Vqj_WH7DwWZ37RxNjMMTG8gIcZryP1y_uygyLfMS34VUaqECq-3Y6WmE084fvJSjjczI5LIEMZULUmrYoIuuT9gOXOkNpJkGgfIL-t5OcL4goYz-HFsJgmmLFFJBVJKGC50JolEz5Wi5iuOM83BqCihVvXH4xjt0DQt_yl9vad28DvKrfoSYBfn9S7jALtPzGmYq_w-DH7p3TNEFYSYRILWa6veUju4QFMge5fx02v-fUilsxShYYP3YVRPeWGAqF-lJaeOKRjMUUfPG1Sn4HvcuSlXEHKNgzddOflemMW0goa9lWBfaChw1xje7ltEgL3DsX09ZryBZIAEpCR5oj8O9QOfMqkQVOv3PPD9Y9iSCGIrz1jb9RnSvggU9Tw_29_7TdVQYqUZPahLkT1IDq3CXhN79wlr3RMBuH3P3hzsZX7HBGn44FGmsImLNvuy1Q7tSS3Y6g_0QjC6-Ia-JSfwl3iyucCuJJ0bX4BW8K1lxuaTqcr7sWX7UGTdrKwTjGF0TQMzq7K31xbn1nKQunNda50rtxtuUfVlKThi047SVqB7kAQuKYsY-lDdcChEgCiNLAOYyGiXI9IW8KUchV8F1io=w524-h222-no'
              }}
        />
        <Text>         </Text>
        <Button color='dodgerblue' title= " Go to Home " onPress={() => navigate('Home')} />
      </View>
    )
  }
};

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home",
    headerLeft: null,
    };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title= " Go to Loading " onPress={() => navigate('Load') } />
        <Text> </Text>
        <Button title= " Go to Search  " onPress={() => navigate('Search') } />
        <Text> </Text>
        <Button title= " Go to Listing " onPress={() => navigate('List') } />
        <Text> </Text>
        <Button title= " Go to Summary " onPress={() => navigate('Summary') } />
        <Text> </Text>
        <Button title= " Go to MapScr  " onPress={() => navigate('Maps') } />
        <Text> </Text>
        <Button title= " Go to Setting " onPress={() => navigate('Setting') } />
        <Text> </Text>
        <Button title= " Go to Landmark" onPress={() => navigate('Landmark') } />
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

class ListScreen extends React.Component {
  static navigationOptions = { title: "Listings", };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    )
  }
};

class SummaryScreen extends React.Component {
  static navigationOptions = { title: "Summary", };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
  Load: {
    screen: LoadScreen,
    navigationOptions: {
      headerTitle: 'Loading...',
    },
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
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
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
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
})
