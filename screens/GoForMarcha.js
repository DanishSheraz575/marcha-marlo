import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import PagerView from "react-native-pager-view";

import ScreenHeader from "../components/ScreenHeader";
import MarchaSpinner from "../components/MarchaSpinner";
import ProductsNotFound from "../components/ProductsNotFound";
import ProductPager from "../components/ProductPager";

import StyleOf from "../assets/AppStyles";

export default function GoForMarcha({ navigation }) {


  if (global.myProductSelectedId > 0) {
    var getProductsOf = "go_for_marcha";
    var backBtnType="GoBackToMyProducts";
  } else {
    var getProductsOf = "my_products";
    var backBtnType="GoBackToExploreProducts";
  }

  const [productsState, setProductsState] = useState(0);
  const [dataList, setDataList] = useState(false);

  const pid = global.myProductSelectedId;
  const data = {
    api_token: global.token,
    user_id: global.uid,
    product_ids: pid,
  };

  useEffect(() => {


    //fetch(global.api + "go_for_marcha", {
    fetch(global.api + getProductsOf, {
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
          let productList = json.result;
          /*
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
          */
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
      {/* <ScreenHeader title="Available Products For Marcha" /> */}
      <View style={[StyleOf.containerInner]}>
        {(() => {
          if (productsState == 0) {
            return <MarchaSpinner size={70} />;
          }
          return null;
        })()}

        {(() => {
          if (productsState == 1) {
            return <ProductsNotFound btnType={backBtnType} />;
          }
          return null;
        })()}

        {(() => {
          if (productsState == 2) {
            return <ProductPager data={dataList} />;
          }
          return null;
        })()}
      </View>
    </View>
  );
}
