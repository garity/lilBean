import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImagePickerIOS,
  Image
} from 'react-native';
import {ImageSelectionView} from './ImageSelectionView';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
 	  	images: [],
    };
    this.pickImages = this.pickImages.bind(this);
  }

  componentDidMount() {
    this.pickImages();
  }

  pickImages() {
    // openSelectDialog(config, successCallback, errorCallback);
    ImagePickerIOS.openSelectDialog({}, imageUri => {
    	console.log("inside picker", imageUri);
      	// this.setState({ images: [...this.state.images, imageUri] });
    }, error => console.error(error));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageSelectionView images={this.state.images} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});