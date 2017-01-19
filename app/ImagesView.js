import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';

export const ImagesView = (props) => {
  const images = props.images;
  console.log("inside ImagesView, ", props.images);
  return (
      <View style={styles.container}>
        <ScrollView horizontal >
          <View style={styles.imageContainer} >
            {images && images.map((image, index) => <Image style={styles.image} key={ index } source={{ uri: image.uri }} /> )}
          </View>
        </ScrollView>
      </View>

  );
  
}

const styles = StyleSheet.create({
  container: {

    
    backgroundColor: '#7EFCF0',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    align: 'center',


  },
  image: {
    width: 360,
    height: 500,
    margin: 2,
  },
});