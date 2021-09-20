import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  CheckBox,
} from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import BottomLinks from "../components/BottomLinks";
import MarchaSpinner from "../components/MarchaSpinner";

const numColumns = 2;
const WIDTH = Dimensions.get("window").width;

export default function ExploreMyProductsCard({ data, checkbox=false }) {

    const [isChecked, setChecked] = useState(false);   

  //const [dataList, setDataList] = useState([]);

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
        <View style={Styles.productImageContainer}>
        {(() => {
          if (checkbox) {
            return (
                <CheckBox 
                value={isChecked} 
                onValueChange={setChecked}
                    style={Styles.checkbox}
                />
            );
          }
          return null;
        })()}
          <Image style={Styles.productImage} source={{ uri: item.image }} />
          {/* <Image  style={Styles.productImage} source={{uri:'https://www.marchamarlo.com/product_images/163183568819.jpg'}} /> */}
        </View>
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
    justifyContent: "center",
    padding: 4,
    borderRadius: 10,
    marginBottom: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox:{
    alignSelf:'flex-start',
    position:'relative',
    elevation: 4
  },
  productImage: {
    width: 130,
    height: 130,
    position:'relative',
    marginBottom:10,
    marginTop:-8,
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
