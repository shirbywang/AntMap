import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';


export default class mapsTest extends Component {
  render() {
    // let logo = { uri: 'https://lh3.googleusercontent.com/uGvFtrf37kN0UqmQM5M2nQ5PT78UCzNcUoudilWZJPgtE3PJ4hS9ZvkYQXZS73td46pB7FUlozyFtVd0BAxJ8_2pqBepF4Ti9aQwPwk8EV48jNh63dTmjEhyz0KnBZcMhxDRJdMkW2i1b7_H5ag3QsXmB_Tf-4OENW7LD9QC4ejC3vsKtT3gMXPyrn2AoKyDDQQ3ZGN5eB-bKadtnXySBHkYaexU5THglrSgUoNa-NyacghISbO_x5ybvTGQsJ0tAlAJDwn2MI_Pa9pwQtydKAIsAtSrdxrC-otyT3mgsPMNTH8NRPwcXaQSp5-up647DkF3SKGuZGWx_eIa6GVmMa2zxa4toGZG5euYCrzYLHup6X_zaNWXr-u3A-OEj84yoR1quwX6ypszWL0xIqTw5pffk7BrwV_Q4sRGrys3CHRUeDBalBfSpm-ah8VXP4q2SQCipdIS65lABgvLETDpD3IVI5Nvnd3KxmSs26Ir5YLqWwv1kC-OPr3pivkNWFbpeP58V17xE23iHCbsmaznGtQOxOBOWdinRG0Ry0fgtCWYcRI-31dLpF2-U9yQQAgyfCC8uejhQndgmWG9Kv_UMIN3b9_3YK16G7Ugp2bWzlUCdDtvTHW-aywp4ni_-Sh6Y9Bc9Qh7rbwdE7_oVdq9HSB337kZHpa1y24=w576-h262-no'};

    return (
      <View style={{flex:1}}>
        <View style={{height: 25, backgroundColor: 'black'}}/>
        <View style={{height: 40, backgroundColor: 'gold'}}/>
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
