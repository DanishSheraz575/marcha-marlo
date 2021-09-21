import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "./ScreenHeader";
import BottomLinks from "./BottomLinks";
import MarchaSpinner from "./MarchaSpinner";

const numColumns = 2;
const WIDTH = Dimensions.get("window").width;

export default function MyProductsCard({ data }) {
  const [isChecked, setChecked] = useState(global.myProductSelectedId);

  //const [dataList, setDataList] = useState([]);

  function selectProductToMarcha(id = 0) {
    global.myProductSelectedId = id;
    setChecked(id);
  }

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
      return <View style={[Styles.productCard, Styles.itemInvisible]} />;
    }
    return (
      <View style={Styles.productCard}>
        <TouchableOpacity onPress={() => selectProductToMarcha(item.id)}>
          {global.myProductSelectedId == item.id ? (
            <View style={[Styles.productImageContainer,Styles.selectedProduct]}>
              <Image
                resizeMode="contain"
                resizeMethod="auto"
                style={Styles.productImage}
                source={{ uri: item.image }}
              />
            </View>
          ) : (
            <View style={[Styles.productImageContainer]}>
              <Image
                resizeMode="contain"
                resizeMethod="auto"
                style={Styles.productImage}
                source={{ uri: item.image }}
              />
            </View>
          )}
        </TouchableOpacity>
        <Text style={Styles.productPrice}>Rs. {item.value}</Text>
        <Text style={Styles.productTitle}>{item.title}</Text>
        <Text style={Styles.productLocation}>
          <Image
            style={Styles.productLocationMarker}
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
      numColumns={numColumns}
    />
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productCard: {
    //alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 10,
    //height: WIDTH / numColumns,
  },
  productImageContainer: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#ffffff",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    marginBottom: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedProduct: {
    borderColor: "red",
  },
  checkbox: {
    alignSelf: "flex-start",
    position: "relative",
    elevation: 4,
  },
  productImage: {
    width: 130,
    height: 130,
    alignSelf: "center",
  },
  productPrice: {
    color: "#000000",
    textAlign: "left",
    fontSize: 16,
    marginBottom: 6,
  },
  productTitle: {
    color: "#9F9F9F",
    fontSize: 13,
    marginBottom: 6,
    height: 15,
  },
  productLocation: {
    color: "#9F9F9F",
    textAlign: "left",
    marginBottom: 6,
  },
  productLocationMarker: {
    marginRight: 10,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
});
