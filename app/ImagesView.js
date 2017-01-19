import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export const ImagesView = (props) => {
  const images = props.images;
  return (
    <View style={{ flex: 1 }}>
      {images && images.map((image, index) => <Image style={{ flex: 1 }} key={ index } source={{ uri: image}} /> )}
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