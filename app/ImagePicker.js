import React, { Component } from 'react';
import { 
  Image, 
  ScrollView,
  View,
  StyleSheet,
  } from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';





export default class PickImages extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
    }
  }

  chooseImages() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
}); 
  }
    
  componentWillMount(){
    this.chooseImages();
  }


  render() {
    return (
      <ScrollView style={styles.container}>
          <View style={styles.imageGrid}>
            { this.state.images.map((image) => <Image style={styles.image} source={{ uri: image.uri }} />) }
          </View>          
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    imageGrid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    image: {
        width: 100,
        height: 100,
        margin: 10,
    },
});



