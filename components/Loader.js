import React, { useState } from "react";
import {   StyleSheet,
  View,
  Modal,
  ActivityIndicator } from 'react-native';

export default function Loader({showit=false}) {
  return (
    <Modal
      animationType={'none'}
      visible={showit}
      onRequestClose={() => {console.log('close modal')}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          {/* <ActivityIndicator animating={true} /> */}
            <ActivityIndicator size="large" color="#662D91" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000020'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
