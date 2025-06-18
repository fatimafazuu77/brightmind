import { View, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';

export default function BackgroundContainer({ children, style }) {
  return (
    <View style={[styles.container, style]}>
      <ImageBackground
        source={require('../../assets/images/wave.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.1,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
}); 