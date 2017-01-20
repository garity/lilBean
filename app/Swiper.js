import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Animated,
} from 'react-native';
import {ImagesView} from './ImagesView';

export const Swiper = (props) => {
  const translateX = props.scrollValue.interpolate({
    inputRange: [0, 1], outputRange: [0, -props.viewWidth]
  });

  const sceneContainerStyle = {
    width: props.viewWidth * props.images.length,
    flex: 1,
    flexDirection: 'row',
  };
  
  return (
    <View onLayout={ props.handleLayout} style={ { flex: 1, overflow: 'hidden' } }>
      <Animated.View
        {...props._panResponder.panHandlers}
        style={ [sceneContainerStyle, { transform: [{ translateX }] }] }
      >
        <ImagesView images={props.images} sceneContainerStyle={sceneContainerStyle} />
      </Animated.View>
    </View>
  )
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