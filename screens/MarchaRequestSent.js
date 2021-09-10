import React from 'react';
import { View, Text } from 'react-native';

import StyleOf from '../assets/AppStyles';


import ScreenHeader from '../components/ScreenHeader';
import BottomLinks from '../components/BottomLinks';

export default function MarchaRequestSent({ }) {
  return (
    <View style={StyleOf.fullContainer}>

      <ScreenHeader title="Marcha Request Sent" />

      <View style={StyleOf.containerInner}>
        <Text>Marcha Request Sent</Text>
      </View>
      
      <BottomLinks active="" />
    </View>
  );
}
