import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';

export default class antMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      coords: []
    }

    setInterval(() => {
    this.setState(previousState => {
      return { showText: true };
    });
  }, 1000);
  }

  componentDidMount() {
    this.getDirections("33.646064,-117.842746","33.643416,-117.842059")
  }

  async getDirections(startLoc, destinationLoc) {

      try {
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

  render() {
    let logo = { uri: 'https://lh3.googleusercontent.com/UKHz9AkBFV-a5c1TTRgvG8jk5YVjpOQX77vRYoFhT_ZAaZk487uvHznvSHWP4okpM6FOKNML_Vqj_WH7DwWZ37RxNjMMTG8gIcZryP1y_uygyLfMS34VUaqECq-3Y6WmE084fvJSjjczI5LIEMZULUmrYoIuuT9gOXOkNpJkGgfIL-t5OcL4goYz-HFsJgmmLFFJBVJKGC50JolEz5Wi5iuOM83BqCihVvXH4xjt0DQt_yl9vad28DvKrfoSYBfn9S7jALtPzGmYq_w-DH7p3TNEFYSYRILWa6veUju4QFMge5fx02v-fUilsxShYYP3YVRPeWGAqF-lJaeOKRjMUUfPG1Sn4HvcuSlXEHKNgzddOflemMW0goa9lWBfaChw1xje7ltEgL3DsX09ZryBZIAEpCR5oj8O9QOfMqkQVOv3PPD9Y9iSCGIrz1jb9RnSvggU9Tw_29_7TdVQYqUZPahLkT1IDq3CXhN79wlr3RMBuH3P3hzsZX7HBGn44FGmsImLNvuy1Q7tSS3Y6g_0QjC6-Ia-JSfwl3iyucCuJJ0bX4BW8K1lxuaTqcr7sWX7UGTdrKwTjGF0TQMzq7K31xbn1nKQunNda50rtxtuUfVlKThi047SVqB7kAQuKYsY-lDdcChEgCiNLAOYyGiXI9IW8KUchV8F1io=w524-h222-no'
    }

    return (
      <View style={{flex:1}}>
        <View style={styles.iconBar}>

        </View>
        <View style={styles.logoBar}>
          <Image source={logo} style={{width: 125, height: 50}}/>
        </View>
        <View style={{flex:1, backgroundColor: 'steelblue'}}>
          <MapView
            style={styles.map}
            region={{
              latitude: 33.646064,
              longitude: -117.842746,
              latitudeDelta: 0.015,
              longitudeDelta: 0.012,
            }}
          />

          <MapView.Polyline
          coordinates = {this.state.coords}
          strokeWidth = {2}
          strokeColor = 'red'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
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
