import React from "react";
import { View, Text, Pressable, LinearGradient } from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import BottomLinks from "../components/BottomLinks";

import Logo from "../components/Logo";

export default function Dashboard({}) {
  return (
    <View style={StyleOf.fullContainer}>
      <ScreenHeader title="Dashboard" backbtn="0" />
      <View style={[StyleOf.containerInner, StyleOf.bgEminence]}>
        <View style={[StyleOf.px20, StyleOf.pb10]}>
          <Text style={[StyleOf.f12, StyleOf.textWelcome]}>welcome,</Text>
          <Text style={[StyleOf.textLgMd, StyleOf.textWhite]}>
            {global.ufull_name}
          </Text>
          <Text style={[StyleOf.f12, StyleOf.textWhite]}>{global.uemail}</Text>
        </View>

        <View style={[StyleOf.dashboardContainer]}>

            <View style={StyleOf.dashboardRow}>
              <View style={[StyleOf.dashboardBox,{ backgroundColor: "blue"}]}>
                <Text>Column1</Text>
              </View>
              <View style={[StyleOf.dashboardBox,{ backgroundColor: "red"}]}>
                <Text>Column1</Text>
              </View>
            </View>





            

        </View>
      </View>

      <BottomLinks active="home" />
    </View>
  );
}
