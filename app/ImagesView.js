import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import Swiper from './swiper';

export const ImagesView = (props) => {
  const images = props.images;
  console.log("inside ImagesView, ", props.images);
  return (
    <Swiper>
      {images && images.map((image, index) => {
        return (
          <View style={styles.container}>  
            <Image style={styles.image} key={ index } source={{ uri: image.uri }} /> 
          </View>
        )
        }
      )}
    </Swiper>
  );
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7EFCF0',

  },
  image: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
});