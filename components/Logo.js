import * as React from 'react';
import { StyleSheet, Image } from 'react-native';

export default function Logo() {
  return (
    <>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
    </>
  );
}

const styles = StyleSheet.create({
logo:{
  resizeMode: 'stretch',
  width:277,
}
});
