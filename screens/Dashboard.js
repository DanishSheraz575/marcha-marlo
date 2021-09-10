import React from "react";
import { View, Text } from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import BottomLinks from "../components/BottomLinks";

import Logo from "../components/Logo";

export default function Dashboard({}) {
  return (
    <View style={StyleOf.fullContainer}>
      <ScreenHeader title="Dashboard" backbtn="0" />
      <View style={[StyleOf.containerInner, StyleOf.bgEminence]}>

        <View style={[StyleOf.px20,StyleOf.py10]}>
          <Text style={[StyleOf.textLgMd, StyleOf.textWhite]}>
            {global.ufull_name}
          </Text>
          <Text style={[StyleOf.f12, StyleOf.textWhite]}>
            Last updated, {global.ulast_login}
          </Text>
        </View>


      </View>
      <BottomLinks active="home" />
    </View>
  );
}
