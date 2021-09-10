import React from 'react';
import { View, Text } from 'react-native';

import StyleOf from '../assets/AppStyles';


import ScreenHeader from '../components/ScreenHeader';
import BottomLinks from '../components/BottomLinks';

export default function MarchaRequestReceived({ }) {
  return (
    <View style={StyleOf.fullContainer}>

      <ScreenHeader title="Marcha Done" />

      <View style={StyleOf.containerInner}>
        <Text>Marcha Request Received</Text>
      </View>
      
      <BottomLinks active="" />
    </View>
  );
}
