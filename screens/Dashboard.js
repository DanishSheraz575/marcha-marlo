//import React from "react";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import BottomLinks from "../components/BottomLinks";

//import Logo from "../components/Logo";

export default function Dashboard({ navigation }) {
  const {
    fullContainer,
    bgImage,
    containerInner,
    dashboardBoxMagenta,
    dashboardBoxGray,
    px20,
    pb10,
    f12,
    textWelcome,
    textLgMd,
    textWhite,
    dashboardContainer,
    dashboardRow,
    dashboardBox,
    dashboardBoxGreen,
    dashboardBoxImg,
    dashboardBoxLabel,
    dashboardBoxBlue,
    dashboardBoxYellow,
    dashboardBoxRed,
  } = StyleOf;

  const [products, setProducts] = useState([]);
  // const [exploreProducts, setExploreProducts] = useState([]);
  const image = require("../assets/dashboardbg.png");

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={[fullContainer]}>
      <ImageBackground source={image} style={bgImage}>
        <ScreenHeader title="Dashboard" backbtn="0" bgColor="" />
        <View style={[containerInner]}>
          <View style={[px20, pb10]}>
            <Text style={[f12, textWelcome]}>welcome,</Text>
            <Text style={[textLgMd, textWhite]}>{global.ufull_name}</Text>
            <Text style={[f12, textWhite]}>{global.uemail}</Text>
          </View>

          <View style={[dashboardContainer]}>
            <View style={dashboardRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate("MarchaRequestReceived")}
                style={[dashboardBox, dashboardBoxGreen]}
              >
                <Image
                  resizeMethod="scale"
                  resizeMode="center"
                  style={dashboardBoxImg}
                  source={require("../assets/marcha_requests.png")}
                />
                <Text style={dashboardBoxLabel}>MARCHA'S REQUESTS</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("MyProducts", { products })}
                style={[dashboardBox, dashboardBoxBlue]}
              >
                <Image
                  resizeMethod="auto"
                  resizeMode="center"
                  style={dashboardBoxImg}
                  source={require("../assets/explore_products.png")}
                />
                <Text style={dashboardBoxLabel}>MY PRODUCTS</Text>
              </TouchableOpacity>
            </View>

            <View style={dashboardRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate("MarchaDone")}
                style={[dashboardBox, dashboardBoxYellow]}
              >
                <Image
                  resizeMethod="auto"
                  resizeMode="center"
                  style={dashboardBoxImg}
                  source={require("../assets/marcha_done.png")}
                />
                <Text style={dashboardBoxLabel}>
                  {/* Marcha Done list */}
                  NUMBER OF MARCHA'S DONE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("MarchaPendingRequests")}
                style={[dashboardBox, dashboardBoxRed]}
              >
                <Image
                  resizeMethod="auto"
                  resizeMode="center"
                  style={dashboardBoxImg}
                  source={require("../assets/pending_requests.png")}
                />
                <Text style={dashboardBoxLabel}>
                  {/* Marcha Request received */}
                  PENDING REQUESTS
                </Text>
              </TouchableOpacity>
            </View>

            <View style={dashboardRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate("MarchaDoneRequests")}
                style={[dashboardBox, dashboardBoxGray]}
              >
                <Image
                  style={dashboardBoxImg}
                  resizeMethod="auto"
                  resizeMode="center"
                  source={require("../assets/marcha_requests.png")}
                />
                <Text style={dashboardBoxLabel}>
                  {/* Marcha Request sent */}
                  MARCHA DONE REQUESTS
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("MyProfile")}
                style={[dashboardBox, dashboardBoxMagenta]}
              >
                <Image
                  resizeMethod="auto"
                  resizeMode="center"
                  style={dashboardBoxImg}
                  source={require("../assets/user_profile.png")}
                />
                <Text style={dashboardBoxLabel}>
                  {/* Marcha Done Requests */}
                  USER PROFILE
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
