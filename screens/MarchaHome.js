import React from "react";
import { View, Text } from "react-native";

import StyleOf from "../assets/AppStyles";

//import ScreenHeader from '../components/ScreenHeader';
import BottomLinks from "../components/BottomLinks";

import Logo from "../components/Logo";

export default function MarchaHome({}) {
  return (
    <View style={StyleOf.fullContainer}>
      <View style={[StyleOf.fullContainer, { backgroundColor: "#475993" }]}>
        {/* <ScreenHeader title="Marcha Marlo" /> */}

        <View style={StyleOf.container}>
          <Text>Marcha Marlo Home {global.uid}</Text>
        </View>



        <BottomLinks active="home" />
      </View>
    </View>
  );
}
