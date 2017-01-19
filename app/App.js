import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
} from 'react-native';
import {ImagesView} from './ImagesView';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
 	  	images: [],
    };
    this.storeImages = this.storeImages.bind(this);
  }

  componentDidMount() {
  	const fetchParams = {
  		first: 5,
  	};
    CameraRoll.getPhotos(fetchParams)
    .then(images => {
    	this.storeImages(images);
    })
    .catch(console.error);
  }

  storeImages(data) {
  	const assets = data.edges;
    const newImages = assets.map( asset => asset.node.image );
    this.setState({
        images: newImages,
    });
  }

  render() {
  	console.log("state inside render ", this.state);
    return (
      <View style={{ flex: 1 }}>
        <ImagesView images={this.state.images} />
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