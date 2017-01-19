import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import Swiper from 'react-native-page-swiper'

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
  // imageContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  image: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    // width: 360,
    // height: 500,
    // margin: 2,
  },
});