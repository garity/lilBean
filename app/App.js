import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  Animated,
  Dimensions,
  PanResponder
} from 'react-native';
import {Swiper} from './Swiper';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
 	  	images: [],
      index: 0,
      scrollValue: new Animated.Value(0),
      viewWidth: Dimensions.get('window').width,
      threshold: 25,
    };
    this.storeImages = this.storeImages.bind(this);
    this.handleLayout = this.handleLayout.bind(this);
    this.reorderImages = this.reorderImages.bind(this);
    this.goToPage = this.goToPage.bind(this);
  }

  componentWillMount() {
    const fetchParams = {
      first: 5,
      // groupTypes: 'Album',
      // groupName: 'lilBean'
    };
    CameraRoll.getPhotos(fetchParams)
    .then(images => {
      this.storeImages(images);
    })
    .catch(console.error);

    const release = (e, gestureState) => {
      const relativeGestureDistance = gestureState.dx / this.state.viewWidth;
      const { vx } = gestureState;

      let newIndex = this.state.index;

      if (relativeGestureDistance < -0.5 || (relativeGestureDistance < 0 && vx <= -0.5)) {
        newIndex = newIndex + 1;
      } else if (relativeGestureDistance > 0.5 || (relativeGestureDistance > 0 && vx >= 0.5)) {
        newIndex = newIndex - 1;
      }
      this.goToPage(newIndex);
    };

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) => {
        const { threshold } = this.state.threshold;

        // Claim responder if it's a horizontal pan
        if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
          return true;
        }

        // and only if it exceeds the threshold
        if (threshold - Math.abs(gestureState.dx) > 0) {
          return false;
        }

      },

      // Touch is released, scroll to the one that you're closest to
      onPanResponderRelease: release,
      onPanResponderTerminate: release,

      // Dragging, move the view with the touch
      onPanResponderMove: (e, gestureState) => {
        let dx = gestureState.dx;
        let offsetX = -dx / this.state.viewWidth + this.state.index;

        this.state.scrollValue.setValue(offsetX);
      }
    });
  }

  reorderImages() {
    let images = this.state.images;
    const index = this.state.index;
    if (index > 0 && index < images.length-1) {
      return;
    }
    let newIndex = index === 0 ? index + 1 : index - 1
    let imagesNext = index === 0 ? [images[0]].concat(images) : images.concat(images.slice(-1));
    let imagesFinal = index === 0 ? images.slice(-1).concat(images.slice(0,-1)) : images.slice(1).concat(images[0]);
    this.setState({
      images: imagesFinal,
      index: newIndex,
      scrollValue: new Animated.Value(newIndex)
    });
  }

  // reorderImagesOff() {
  //   let newImageArr = this.state.images;
  //   const index = this.state.index;
  //   if(index === 0) {
  //     const lastImg = newImageArr.pop();
  //     this.setState({
  //       images: [newImageArr[0]].concat(newImageArr),
  //     });
  //     requestAnimationFrame(() => {
  //       this.setState({
  //         index: index + 1,
  //         scrollValue: new Animated.Value(index + 1)
  //       });
  //       requestAnimationFrame(() => {
  //         this.setState({
  //           images: [lastImg].concat(newImageArr)
  //         });
  //       });
  //     });
  //   }
  //   if(index === this.state.images.length - 1) {
  //     const firstImg = newImageArr.shift();
  //     newImageArr = newImageArr.concat([firstImg]);
  //     this.setState({
  //       images: newImageArr,
  //       index: index - 1,
  //       scrollValue: new Animated.Value(index - 1)
  //     });
  //   }
  // }

  goToPage(pageNumber) {
  // Don't scroll outside the bounds of the screens
    pageNumber = Math.max(0, Math.min(pageNumber, this.state.images.length));
    this.setState({index: pageNumber})

    Animated.spring(this.state.scrollValue, { 
      toValue: pageNumber, 
      friction: this.props.springFriction, 
      tension: this.props.springTension 
    })
    .start(() => this.reorderImages());
  }

  handleLayout(event) {
    const { width } = event.nativeEvent.layout;

    if (width) {
      this.setState({ viewWidth: width });
    }
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
        <Swiper 
        images={this.state.images} 
        handleLayout={this.handleLayout} 
        _panResponder={this._panResponder}
        scrollValue={this.state.scrollValue}
        viewWidth={this.state.viewWidth}

        />
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