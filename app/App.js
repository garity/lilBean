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
import Sound from 'react-native-sound';
import {Swiper} from './Swiper';


// these always error for some reason when they load
// probably because they're mp3s
const onSoundLoadError = () => {};
const sounds = {
  'a':  new Sound('a.mp3',  Sound.MAIN_BUNDLE, onSoundLoadError),
  'a#':  new Sound('a#.mp3',  Sound.MAIN_BUNDLE, onSoundLoadError),
  'b': new Sound('b.mp3', Sound.MAIN_BUNDLE, onSoundLoadError),
  'c':  new Sound('c.mp3',  Sound.MAIN_BUNDLE, onSoundLoadError),
  'c#': new Sound('c#.mp3', Sound.MAIN_BUNDLE, onSoundLoadError),
  'd':  new Sound('d.mp3',  Sound.MAIN_BUNDLE, onSoundLoadError),
  'e':  new Sound('e.mp3',  Sound.MAIN_BUNDLE, onSoundLoadError),
  'e#': new Sound('e#.mp3', Sound.MAIN_BUNDLE, onSoundLoadError),
  'f':  new Sound('f.mp3',  Sound.MAIN_BUNDLE, onSoundLoadError),
  'f#': new Sound('f#.mp3', Sound.MAIN_BUNDLE, onSoundLoadError),
  'g':  new Sound('g.mp3',  Sound.MAIN_BUNDLE, onSoundLoadError),
  'g#': new Sound('g#.mp3', Sound.MAIN_BUNDLE, onSoundLoadError)
}

let melody = ['c', 'd', 'e', 'g', 'a', 'b'];
// let melody = ['e', 'g', 'a', 'b', 'a#', 'd'];

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
    let albumNames = ['lilBean', 'LilBean', 'lilbean', 'Lilbean'];

    function attemptGettingAlbumPhotos() {
      let fetchParams = {
        first: 20,
        groupTypes: "Album"
      };
      if (albumNames.length) {
        fetchParams.groupName = albumNames.shift();
      } else {
        fetchParams = { first: 20 };
      }
      return CameraRoll.getPhotos(fetchParams)
      .then(data => {
        if (data.edges.length) {
          return Promise.resolve(data);
        }
        if (!fetchParams.groupName) {
          return Promise.reject("No photos found!");
        }
        return attemptGettingAlbumPhotos();
      });
    }

    var photoGetter = attemptGettingAlbumPhotos()
    .then(data => {
      this.storeImages(data);
      this.reorderImages();
    }).catch(console.error);

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
    let index = this.state.index;
    let newImages = images.slice();
    if (index === 0) {
      index = index + 1;
      newImages = images.slice(-1).concat(images.slice(0,-1));
    } else if (index === images.length-1) {
      index = index - 1;
      newImages = images.slice(1).concat(images[0]);
    }
    newImages.forEach((image, i) => {
      if (i !== index) {
        image.opacity.setValue(1);
        image.color = this.randomColor();
      }
    })
    this.setState({
      images: newImages,
      index: index,
      scrollValue: new Animated.Value(index)
    });
  }

  goToPage(pageNumber) {
  // Don't scroll outside the bounds of the screens
    let note = melody.sort(() => Math.random() - 0.5 )[0];
    // console.log(note);
    sounds[note].setCategory("Playback");
    sounds[note].stop();
    sounds[note].play();
    pageNumber = Math.max(0, Math.min(pageNumber, this.state.images.length));
    this.setState({index: pageNumber})

    Animated.spring(this.state.scrollValue, { 
      toValue: pageNumber, 
      // friction: this.props.springFriction, 
      // tension: this.props.springTension 
    })
    .start(() => {
      Animated.timing(this.state.images[pageNumber].opacity, {toValue: 0, duration: 1500 }).start();
      this.reorderImages()
    });
  }

  handleLayout(event) {
    const { width } = event.nativeEvent.layout;

    if (width) {
      this.setState({ viewWidth: width });
    }
  }

  randomColor() {
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    return 'rgb(' + [r,b,g].join(',') + ')';
  }

  storeImages(data) {
  	const assets = data.edges;
    const newImages = assets.map( asset => {
      var image = asset.node.image;
      image.color = this.randomColor();
      image.opacity = new Animated.Value(1);
      return image;
    });
    Animated.timing(newImages[0].opacity, {toValue: 0, delay: 500, duration: 2000 }).start();
    this.setState({
        images: newImages,
    });
  }

  render() {
  	// console.log("state inside render ", this.state);
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