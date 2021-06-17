import React from 'react';
import { View, Text } from 'react-native';

import StyleOf from '../assets/AppStyles';


import ScreenHeader from '../components/ScreenHeader';
import BottomLinks from '../components/BottomLinks';

export default function AddProduct({ }) {
  return (
    <View style={StyleOf.fullContainer}>

      <ScreenHeader title="Add Product" />

      <View style={StyleOf.container}>
        <Text>Add Product</Text>
      </View>
      
      <BottomLinks active="add" />
    </View>
  );
}
