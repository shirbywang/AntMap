import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

//Style Sheets for other classes (can be referred in style section of each object, such as map for mapstyle)
export const styles = StyleSheet.create({

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
