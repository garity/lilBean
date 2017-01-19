import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ImagesView} from './ImagesView';

export const ImageSelectionView = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <ImagesView images={props.images} />
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});