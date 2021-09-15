import React from "react";
import { View, Text, Image, TouchableOpacity,ImageBackground } from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import BottomLinks from "../components/BottomLinks";

import Logo from "../components/Logo";

export default function Dashboard({navigation}) {
  const image =  require('../assets/dashboardbg.png');
  return (
    <View style={StyleOf.fullContainer}>
      <ImageBackground source={image} style={StyleOf.bgImage}>
        <ScreenHeader title="Dashboard" backbtn="0" bgColor='' />

        <View style={[StyleOf.containerInner]}>
          <View style={[StyleOf.px20, StyleOf.pb10]}>
            <Text style={[StyleOf.f12, StyleOf.textWelcome]}>welcome,</Text>
            <Text style={[StyleOf.textLgMd, StyleOf.textWhite]}>
              {global.ufull_name} 
              <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
                <Image source={require('../assets/edit_icon.png')} />
              </TouchableOpacity>
            </Text>
            <Text style={[StyleOf.f12, StyleOf.textWhite]}>{global.uemail}</Text>
          </View>

          <View style={[StyleOf.dashboardContainer]}>
            <View style={StyleOf.dashboardRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate('MyProducts')}
                style={[StyleOf.dashboardBox, StyleOf.dashboardBoxGreen]}
              >
                <Image
                  style={StyleOf.dashboardBoxImg}
                  source={require("../assets/marcha_icon.png")}
                />
                <Text style={StyleOf.dashboardBoxLabel}>My products</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ExploreProducts')}
                style={[StyleOf.dashboardBox, StyleOf.dashboardBoxBlue]}
              >
                <Image
                  style={StyleOf.dashboardBoxImg}
                  source={require("../assets/marcha_icon.png")}
                />
                <Text style={StyleOf.dashboardBoxLabel}>Explore Products</Text>
              </TouchableOpacity>
            </View>

            <View style={StyleOf.dashboardRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate('MarchaDone')}
                style={[StyleOf.dashboardBox, StyleOf.dashboardBoxYellow]}
              >
                <Image
                  style={StyleOf.dashboardBoxImg}
                  source={require("../assets/marcha_icon.png")}
                />
                <Text style={StyleOf.dashboardBoxLabel}>
                  Marcha Done list
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('MarchaRequestReceived')}
                style={[StyleOf.dashboardBox, StyleOf.dashboardBoxRed]}
              >
                <Image
                  style={StyleOf.dashboardBoxImg}
                  source={require("../assets/marcha_icon.png")}
                />
                <Text style={StyleOf.dashboardBoxLabel}>
                  Marcha Request received
                </Text>
              </TouchableOpacity>
            </View>

            <View style={StyleOf.dashboardRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate('MarchaRequestSent')}
                style={[StyleOf.dashboardBox, StyleOf.dashboardBoxGray]}
              >
                <Image
                  style={StyleOf.dashboardBoxImg}
                  source={require("../assets/marcha_icon.png")}
                />
                <Text style={StyleOf.dashboardBoxLabel}>
                  Marcha Request sent
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('MarchaDoneRequests')}
                style={[StyleOf.dashboardBox, StyleOf.dashboardBoxMagenta]}
              >
                <Image
                  style={StyleOf.dashboardBoxImg}
                  source={require("../assets/marcha_icon.png")}
                />
                <Text style={StyleOf.dashboardBoxLabel}>
                  Marcha Done Requests
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <BottomLinks active="home" />
      </ImageBackground>
    </View>
  );
}
