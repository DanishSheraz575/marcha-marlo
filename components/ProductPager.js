import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

import { SliderBox } from "react-native-image-slider-box";

import { LinearGradient } from "expo-linear-gradient";

import PagerView from "react-native-pager-view";

import StyleOf from "../assets/AppStyles";

export default function ProductPager({ data }) {
  const navigation = useNavigation();
  //const [detailsOf, setDetailsOf] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [swipeLeftRightState, setSwipeLeftRightState] = useState(true);
  const [productsDetailState, setProductsDetailState] = useState(null);

  /*
  function showDetailOf(id = 0) {
    setProductsDetailState(id);
  }

  function interestedInMarcha(id, value) {
    if (global.comingFrom == "myProducts") {
      global.product_ids = global.myProductSelectedId;
      global.product_value = global.myProductSelectedValue;
      global.marcha_product_id = id;
      global.marcha_product_value = value;
    } else {
      global.product_ids = id;
      global.product_value = value;
      global.marcha_product_id = global.marcha_product_id;
      global.marcha_product_value = global.marcha_product_value;
    }
    navigation.navigate("PayTheDifference");
  }
  */
  function marchaMarnaHy(id, value) {
    global.product_ids = global.myProductSelectedId;
    global.product_value = global.myProductSelectedValue;
    global.marcha_product_id = id;
    global.marcha_product_value = value;

    const data = {
      api_token: global.token,
      user_id: global.uid,
      product_ids: global.product_ids,
      marcha_product_id: global.marcha_product_id,
    };

    fetch(global.api + "send_marcha_request", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        const status = json.status.toLowerCase();
        if (status == "success") {
          alert(json.result);
          navigation.navigate("MarchaPendingRequests");
        } else {
          alert(json.result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function swipeAtion(ref) {
    if (ref == "u") {
      setSwipeLeftRightState(false);
      setProductsDetailState(currentPage);
    } else {
      setSwipeLeftRightState(true);
      setProductsDetailState(null);
    }
  }
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  return (
    <>
      <GestureRecognizer
        //onSwipe={(direction, state) => this.onSwipe(direction, state)}
        onSwipeUp={() => swipeAtion("u")}
        onSwipeDown={() => swipeAtion("d")}
        //onSwipeLeft={() => swipeAtion("l")}
        //onSwipeRight={() => swipeAtion("r")}
        config={config}
        style={[styles.viewPager]}
      >
        <PagerView
          style={styles.viewPager}
          initialPage={0}
          scrollEnabled={swipeLeftRightState}
          onPageSelected={(e) => {
            setCurrentPage(e.nativeEvent.position);
          }}
        >
          {data.map((p, index) => (
            <View style={styles.page} key={index}>
              <ImageBackground
                //resizeMode= "cover"
                //resizeMode="contain"
                resizeMode="center"
                source={{
                  uri: p.images_base_url + p.images,
                }}
                style={[styles.bgImage]}
              >
                <View>
                  <LinearGradient
                    // Background Linear Gradient
                    colors={["transparent", "rgba(0,0,0,1)"]}
                    //colors={["rgba(0,0,0,0.002)", "rgba(0,0,0,1)"]}
                    style={styles.gradientBackground}
                  >
                    <View style={{ flex: 1, bottom: 0, width: "100%" }}>
                      <Text style={[StyleOf.textWhite, styles.pTitle]}>
                        {p.title}
                      </Text>
                      <Text style={[StyleOf.textWhite, styles.font16]}>
                        Condition: {p.condition}
                        <Image
                          source={require("../assets/location-icon2-white.png")}
                        />
                        {p.location}
                      </Text>
                      <Text style={[StyleOf.textWhite, styles.pPrice]}>
                        Marcha Price: Rs. {p.value}
                      </Text>

                      <Text
                        style={[
                          StyleOf.btn,
                          StyleOf.bgRadicalRed,
                          {
                            position: "absolute",
                            bottom: 0,
                            paddingTop: 10,
                            alignSelf: "center",
                            textAlign: "center",
                          },
                        ]}
                      >
                        SWIPE UP FOR DETAILS
                      </Text>
                    </View>
                  </LinearGradient>
                </View>
              </ImageBackground>

              {(() => {
                if (productsDetailState == index) {
                  var productImages = [];
                  if (p.images) {
                    let pimages = p.images.split(",");
                    for (let i = 0; i < pimages.length; i++) {
                      productImages.push(
                        global.product_images_base_url + pimages[i]
                      );
                    }
                  }
                  return (
                    <View style={[styles.detailsContainer, StyleOf.dropShadow]}>
                      <SliderBox
                        dotColor="#FF3D57"
                        inactiveDotColor="#efefef"
                        resizeMethod={"resize"}
                        resizeMode={"cover"}
                        autoplay
                        circleLoop
                        ImageComponentStyle={{borderRadius: 5, width: '100%'}}
                        imageLoadingColor="#2196F3"
                        images={productImages}
                      />
                      <View style={{flex:1,padding:15}}>
                        <Text style={[styles.detailsText, styles.pTitle,{marginTop:20}]}>
                          {p.title}
                        </Text>
                        <Text style={[styles.detailsText, styles.font16]}>
                          Condition: {p.condition}
                          <Image
                            source={require("../assets/location-icon2-back.png")}
                          />
                          {p.location}
                        </Text>
                        <Text style={[styles.detailsText, styles.pPrice]}>
                          Marcha Price: Rs. {p.value}
                        </Text>
                        <Text style={[styles.detailsText, styles.pPrice]}>
                          Description
                        </Text>
                        <ScrollView>
                          <Text>{p.description}</Text>
                        </ScrollView>

                        <TouchableOpacity
                          style={[
                            StyleOf.btn,
                            StyleOf.bgEminence,
                            { alignSelf: "center" },
                          ]}
                          onPress={() => marchaMarnaHy(p.product_id, p.value)}
                        >
                          <Text style={StyleOf.btnLabel}>
                            marcha marna hai?
                          </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                  );
                }
                return null;
              })()}
            </View>
          ))}
        </PagerView>
      </GestureRecognizer>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: "stretch",
    width: 277,
  },
  viewPager: {
    flex: 1,
  },
  bgImage: {
    flex: 1,

    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },
  page: {
    flex: 1,
    //backgroundColor:"green"
    //justifyContent: 'center',
    //width:"100%",
    //height:"100%"
  },
  gradientBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 250,
    padding: 20,
  },

  pTitle: {
    fontSize: 24,
    lineHeight: 26,
  },

  font16: {
    fontSize: 16,
  },

  pPrice: {
    fontSize: 20,
    fontWeight: "bold",
  },
  detailsContainer: {
    flex: 1,
    //    alignItems: "center",
    //padding: 20,
    //paddingHorizontal: 30,
    //paddingBottom: 0,
    //borderTopLeftRadius: 50,
    //borderTopRightRadius: 50,
    //backgroundColor: "#f9f1ff",
    backgroundColor: "#DEDEDE",
    //marginTop: 10,
    flexDirection: "column",
    position: "absolute",
    bottom: 0,
    height: "100%",
    width: "100%",
  },
  detailsText: {
    marginBottom: 5,
    color: "#000000",
  },
});
