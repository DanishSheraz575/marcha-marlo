import React from 'react';
import { View, Text } from 'react-native';

import StyleOf from '../assets/AppStyles';


import ScreenHeader from '../components/ScreenHeader';
import BottomLinks from '../components/BottomLinks';

export default function MarchaPendingRequests({ }) {
  return (
    <View style={StyleOf.fullContainer}>

      <ScreenHeader title="Marcha Pending Requests" />

      <View style={StyleOf.containerInner}>
        <Text>Marcha Pending Requests</Text>
      </View>
      
      <BottomLinks active="" />
    </View>
  );
}
