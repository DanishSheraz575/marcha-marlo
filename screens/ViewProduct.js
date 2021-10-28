import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import StyleOf from "../assets/AppStyles";

export default function ViewProduct({ route }) {
  const navigation = useNavigation();

  const {product_id, title,condition,description,location,value,images}=route.params.productDetails;

  function interestedInMarcha(product_id, value) {
      global.marcha_product_id = product_id;
      global.marcha_product_value = value;
    navigation.navigate("MyProductsForMarchaFromExpolore");
  }
  

  var productImages = [];
  if (images) {
    let pimages = images.split(",");
    for (let i = 0; i < pimages.length; i++) {
      productImages.push(global.product_images_base_url + pimages[i]);
    }
  }

  return (
    <>
      <View style={styles.page}>
        <View style={[styles.detailsContainer, StyleOf.dropShadow]}>
          <SliderBox
            dotColor="#FF3D57"
            inactiveDotColor="#efefef"
            resizeMethod={"resize"}
            resizeMode={"cover"}
            autoplay
            circleLoop
            ImageComponentStyle={{ borderRadius: 5, width: "100%",marginTop:35 }}
            imageLoadingColor="#2196F3"
            images={productImages}
          />
          <View style={{ flex: 1, padding: 15 }}>
            <Text
              style={[styles.detailsText, styles.pTitle]}
            >
              {title}
            </Text>
            <Text style={[styles.detailsText, styles.font16]}>
              Condition: {condition}
              <Image source={require("../assets/location-icon2-back.png")} />
              {location}
            </Text>
            <Text style={[styles.detailsText, styles.pPrice]}>
              Marcha Price: Rs. {value}
            </Text>
            <Text style={[styles.detailsText, styles.pPrice]}>Description</Text>
            <ScrollView>
              <Text>{description}</Text>
            </ScrollView>

            <TouchableOpacity
              style={[StyleOf.btn, StyleOf.bgEminence, { alignSelf: "center" }]}
              onPress={() => interestedInMarcha(product_id, value)}
            >
              <Text style={StyleOf.btnLabel}>I AM INTERESTED</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
