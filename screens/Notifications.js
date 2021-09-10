import React from "react";
import { View, Text } from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from '../components/ScreenHeader';
import BottomLinks from "../components/BottomLinks";

export default function Notifications({}) {
  return (
    <View style={StyleOf.fullContainer}>

      <ScreenHeader title="Notifications" />
      
      <View style={[StyleOf.containerInner,StyleOf.bgEminence]}>
        
        <Text>Notifications</Text>

      </View>

      <BottomLinks active="" />
    </View>
  );
}
