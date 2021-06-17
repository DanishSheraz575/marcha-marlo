import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';

export default function Logo() {
  return (
    <View>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
logo:{
  resizeMode: 'stretch',
  width:277,
}
});
