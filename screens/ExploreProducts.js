import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import BottomLinks from "../components/BottomLinks";
import MarchaSpinner from "../components/MarchaSpinner";
import ProductsNotFound from "../components/ProductsNotFound";
import ExploreMyProductsCard from "../components/MyProductsCard";

const numColumns = 2;
const WIDTH = Dimensions.get("window").width;

export default function ExploreProducts({ navigation }) {

  const [productsState, setProductsState] = useState(0);
  const [dataList, setDataList] = useState(false);

  const data = { api_token: global.token, user_id: global.uid };
  useEffect(() => {
    fetch(global.api + "explore_products", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        var status = json.status.toLowerCase();
        if (status == "success") {
          let productList = [];

          json.result.forEach((item) => {
            let images = item.images.split(",");
            let img = item.product_images_base_url + images[0];
            productList.push({
              id: item.product_id,
              image: img,
              value: item.value,
              title: item.title,
              location: item.location,
            });
          });
          setDataList(productList);
          setProductsState(2);
        } else {
          setProductsState(1);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <View style={StyleOf.fullContainer}>
      <ScreenHeader title="Explore Products" />
      <View style={[StyleOf.containerInner]}>
        {(() => {
          if (productsState == 0) {
            return (
              <View style={StyleOf.rowItemCenter}>
                <MarchaSpinner size={70} />
              </View>
            );
          }
          return null;
        })()}

        {(() => {
          if (productsState == 1) {
            return (
              <ProductsNotFound btnType= "BackToDashboard" />
            );
          }
          return null;
        })()}

        {(() => {
          if (productsState == 2) {
            return (
              <View  style={[{marginBottom:60}]}>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    padding: 10,
                    backgroundColor: "#ffffff",
                  }}
                >
                  Select product to start Marcha
                </Text>
                <ExploreMyProductsCard data={dataList} />
              </View>
            );
          }
          return null;
        })()}
      </View>
      <BottomLinks active="explore" />
    </View>
  );
}
