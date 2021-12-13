import React, { useCallback, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

import StyleOf from "../assets/AppStyles";
const numColumns = 2;
// const WIDTH = Dimensions.get("window").width;
import { useNavigation } from "@react-navigation/native";
import ProductsNotFound from "./ProductsNotFound";

const formatData = (dataList, numColumns) => {
  const totalRows = Math.floor(dataList.length / numColumns);
  let totalLastRow = dataList.length - totalRows * numColumns;
  while (totalLastRow !== 0 && totalLastRow !== numColumns) {
    dataList.push({ key: "blank", empty: true });
    totalLastRow++;
  }
  return dataList;
};

export default function MyProductsCard({ data, refresh, onRefresh }) {
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(global.myProductSelectedId);

  const selectProductToMarcha = useCallback(
    (product_id = 0, value) => {
      global.comingFrom = "myProducts";
      global.myProductSelectedId = product_id;
      global.myProductSelectedValue = value;
      setChecked(product_id);
    },
    [isChecked]
  );

  const getItemLayout = useCallback(
    (data, index) => ({
      length: 100,
      offset: 100 * index,
      index,
    }),
    []
  );

  function renderProductCard({ item, index }) {
    const {
      product_id,
      value,
      images,
      condition,
      title,
      location,
      empty,
    //  product_images_base_url,
    } = item;

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

    if (empty) {
      return <View style={[productCard, itemInvisible]} />;
    } else {
      //let pimages = images.split(",");
      //let img = product_images_base_url + pimages[0];
      let img = global.product_images_base_url + images;
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
              <Image
                style={{
                  alignSelf: "flex-start",
                  marginTop: -18,
                  marginLeft: -18,
                }}
                source={conditionRibbon}
              />
              <Image
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
                <Image
                  style={{ alignSelf: "flex-end" }}
                  source={require("../assets/edit_icon.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={productTitle}>{title}</Text>
          <Text style={[productLocation, f12]}>
            <Image
              style={productLocationMarker}
              source={require("../assets/location-icon.png")}
            />
            {location}
          </Text>
        </View>
      );
    }
  }

  const filterItem = (productId) => {
    const newdata = data.filter(function (item) {
      return item.product_id == productId;
    });
    return newdata[0];
  };

  function gotForEditProduct(product_id) {
    const productDetails = filterItem(product_id);
    navigation.navigate("EditProduct", { productDetails: productDetails });
  }

  return (
    <FlatList
      data={formatData(data, numColumns)}
      renderItem={renderProductCard}
      keyExtractor={(item, index) => index.toString()}
      numColumns={numColumns}
      ListEmptyComponent={<ProductsNotFound btnType="MyProductBtn" />}
      refreshing={refresh}
      onRefresh={onRefresh}
      initialNumToRender={6}
      maxToRenderPerBatch={6}
      getItemLayout={getItemLayout}
    />
  );
}
