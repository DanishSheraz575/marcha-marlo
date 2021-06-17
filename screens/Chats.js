import React from 'react';
import { View, Text } from 'react-native';

import StyleOf from '../assets/AppStyles';


import ScreenHeader from '../components/ScreenHeader';
import BottomLinks from '../components/BottomLinks';

export default function Chats({ }) {
  return (
    <View style={StyleOf.fullContainer}>

      <ScreenHeader title="Chats" />

      <View style={StyleOf.container}>
        <Text>Chats</Text>
      </View>
      

      <BottomLinks active="chats" />

    </View>
  );
}
