import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

//Style Sheets for other classes (can be referred in style section of each object, such as map for mapstyle)
export const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },

  topBar: {
    //backgroundColor: 'rgba(0,0,0,0.5)',
  },

  contentContainer: {
    //backgroundColor: 'skyblue',
  },

  botBar: {
    //backgroundColor: 'steelblue',
  },

  overlay: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  body: {
    flex: 2,
    alignItems: 'center',
  },

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'center',
  },

  barText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign:'center',
  },

  containerText: {
    color: 'white',
    textAlign:'left',
    fontSize: 16,
  },

  summaryStop: {
    //justifyContent: 'left',
    flexDirection: 'row',
  },

  bgImage: {
    flex: 1,
    resizeMode: 'stretch',
  },



})
