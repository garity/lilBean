import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export const ImagesView = (props) => {
  const images = props.images;
  // console.log("inside ImagesView, ", props.images);
  return images && images.length > 0 ? 
    <View style={props.sceneContainerStyle} >
    {images.map((image, index) => {
      return (
        <View key={ image.filename } style={styles.container} >  
          <Image style={styles.image}  source={{ uri: image.uri }} /> 
        </View>
      )}
      )}
    </View>
    : null
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7EFCF0',
    flex: 1,
  },
  image: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',

  },
});