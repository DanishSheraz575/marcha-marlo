//import React from "react";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert
} from "react-native";
import * as SecureStore from "expo-secure-store";
import StyleOf from "../assets/AppStyles";
//import { useNavigation } from "@react-navigation/native";
import BottomLinks from "../components/BottomLinks";

//import Logo from "../components/Logo";

export default function Dashboard({ navigation }) {

  //const navigation = useNavigation();

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
    p20,
    flexIt,
    itemCenter,
    iconBox,
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
        <View style={[flexIt, p20, { alignItems: "center" }]}>
          <View>
            <TouchableOpacity
              style={[itemCenter, iconBox]}
              onPress={() => {
                Alert.alert(
                  'Logout',
                  'Are you sure? You want to logout?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {
                        return null;
                      },
                    },
                    {
                      text: 'Confirm',
                      onPress: () => {
                        SecureStore.deleteItemAsync("marchaUserInfo");
                        navigation.navigate("Home");
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }}
            >
              <Image source={require("../assets/logout.png")} />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "bold" }}
            >
              Dashboard
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={[itemCenter, iconBox]}
              onPress={() => navigation.navigate("Notifications")}
            >
              <Image source={require("../assets/bell.png")} />
            </TouchableOpacity>
          </View>
        </View>

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
