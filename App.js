import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';


export default class mapsTest extends Component {
  render() {
    let logo = { uri: 'https://lh3.googleusercontent.com/UKHz9AkBFV-a5c1TTRgvG8jk5YVjpOQX77vRYoFhT_ZAaZk487uvHznvSHWP4okpM6FOKNML_Vqj_WH7DwWZ37RxNjMMTG8gIcZryP1y_uygyLfMS34VUaqECq-3Y6WmE084fvJSjjczI5LIEMZULUmrYoIuuT9gOXOkNpJkGgfIL-t5OcL4goYz-HFsJgmmLFFJBVJKGC50JolEz5Wi5iuOM83BqCihVvXH4xjt0DQt_yl9vad28DvKrfoSYBfn9S7jALtPzGmYq_w-DH7p3TNEFYSYRILWa6veUju4QFMge5fx02v-fUilsxShYYP3YVRPeWGAqF-lJaeOKRjMUUfPG1Sn4HvcuSlXEHKNgzddOflemMW0goa9lWBfaChw1xje7ltEgL3DsX09ZryBZIAEpCR5oj8O9QOfMqkQVOv3PPD9Y9iSCGIrz1jb9RnSvggU9Tw_29_7TdVQYqUZPahLkT1IDq3CXhN79wlr3RMBuH3P3hzsZX7HBGn44FGmsImLNvuy1Q7tSS3Y6g_0QjC6-Ia-JSfwl3iyucCuJJ0bX4BW8K1lxuaTqcr7sWX7UGTdrKwTjGF0TQMzq7K31xbn1nKQunNda50rtxtuUfVlKThi047SVqB7kAQuKYsY-lDdcChEgCiNLAOYyGiXI9IW8KUchV8F1io=w524-h222-no'}
    return (
      <View style={{flex:1}}>
        <View style={{height: 25, backgroundColor: 'black'}}/>
        <View style={{alignItems:'center',height: 50, backgroundColor: 'gold'}}>
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
    backgroundColor: 'black',

  },


})
