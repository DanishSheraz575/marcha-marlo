import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import StyleOf from "../assets/AppStyles";

const {
  productCard,
  itemInvisible,
  selectedProductImageContainer,
  productImageContainer,
  productImage,
  colContainerRow,
  col5,
  productTitle,
  productPrice,
  productLocation,
  f12,
  productLocationMarker,
} = StyleOf;

const ProductCard = ({ item, index }) => {
  const {
    product_id,
    value,
    images,
    condition,
    title,
    location,
    empty,
    product_images_base_url,
  } = item;

  if (empty) {
    return <View style={[productCard, itemInvisible]} />;
  } else {
    let pimages = images.split(",");
    let img = product_images_base_url + pimages[0];
    if (condition == "New") {
      var conditionRibbon = require("../assets/new.png");
    } else {
      var conditionRibbon = require("../assets/old.png");
    }

    return (
      <View style={productCard}>
        <TouchableOpacity
          onPress={() => selectProductToMarcha(product_id, value)}
        >
          <View
            style={[
              global.myProductSelectedId == product_id
                ? selectedProductImageContainer
                : productImageContainer,
            ]}
          >
            <FastImage
              style={{
                alignSelf: "flex-start",
                marginTop: -18,
                marginLeft: -18,
              }}
              source={conditionRibbon}
            />
            <FastImage
              resizeMode="contain"
              resizeMethod="auto"
              style={productImage}
              source={{ uri: img }}
            />
          </View>
        </TouchableOpacity>

        <View style={colContainerRow}>
          <View style={col5}>
            <Text style={productPrice}>Rs. {value}</Text>
          </View>
          <View style={[col5]}>
            <TouchableOpacity onPress={() => gotForEditProduct(product_id)}>
              <FastImage
                style={{ alignSelf: "flex-end" }}
                source={require("../assets/edit_icon.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={productTitle}>{title}</Text>
        <Text style={[productLocation, f12]}>
          <FastImage
            style={productLocationMarker}
            source={require("../assets/location-icon.png")}
          />
          {location}
        </Text>
      </View>
    );
  }
};

export default ProductCard;
