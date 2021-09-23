import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

import StyleOf from "../assets/AppStyles";

//import ScreenHeader from "./ScreenHeader";
//import BottomLinks from "./BottomLinks";
//import MarchaSpinner from "./MarchaSpinner";

const numColumns = 2;
const WIDTH = Dimensions.get("window").width;

export default function ExploreProductsCard({ data }) {

  function formatData(dataList, numColumns) {
    const totalRows = Math.floor(dataList.length / numColumns);
    let totalLastRow = dataList.length - totalRows * numColumns;
    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      dataList.push({ key: "blank", empty: true });
      totalLastRow++;
    }
    return dataList;
  }

  function renderProductCard({ item, index }) {
    if (item.empty) {
      return <View style={[StyleOf.productCard, StyleOf.itemInvisible]} />;
    }
    return (
      <View style={StyleOf.productCard}>
        <View style={[StyleOf.productImageContainer]}>
              <Image
                resizeMode="contain"
                resizeMethod="auto"
                style={StyleOf.productImage}
                source={{ uri: item.image }}
              />
            </View>
        <Text style={StyleOf.productPrice}>Rs. {item.value}</Text>
        <Text style={StyleOf.productTitle}>{item.title}</Text>
        <Text style={StyleOf.productLocation}>
          <Image
            style={StyleOf.productLocationMarker}
            source={require("../assets/location-icon.png")}
          />
          {item.location}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      //data={formatData(dataList, numColumns)}
      data={formatData(data, numColumns)}
      renderItem={renderProductCard}
      // keyExtractor={(item, index) => index.toString()}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
    />
  );
}
