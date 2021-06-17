import React from 'react';
import { View, Text } from 'react-native';

import StyleOf from '../assets/AppStyles';


import ScreenHeader from '../components/ScreenHeader';
import BottomLinks from '../components/BottomLinks';

export default function ExploreProducts({ }) {
  return (
    <View style={StyleOf.fullContainer}>

      <ScreenHeader title="Marcha Marlo" />

      <View style={StyleOf.container}>
      <Text>Explore Products</Text>
      </View>

      <BottomLinks active="explore" />

    </View>
  );
}
