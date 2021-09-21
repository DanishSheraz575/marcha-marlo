import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import PagerView from "react-native-pager-view";

import ScreenHeader from "../components/ScreenHeader";
import MarchaSpinner from "../components/MarchaSpinner";
import ProductsNotFound from "../components/ProductsNotFound";

import StyleOf from "../assets/AppStyles";

export default function GoForMarcha({ navigation }) {
  const [productsState, setProductsState] = useState(0);
  const [dataList, setDataList] = useState(false);

  const pid = global.myProductSelectedId;
  const data = {
    api_token: global.token,
    user_id: global.uid,
    product_ids: pid,
  };

  useEffect(() => {
    fetch(global.api + "go_for_marcha", {
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
      <View style={[StyleOf.containerInner, { paddingBottom: 80 }]}>
        {(() => {
          if (productsState == 0) {
            return (
              <MarchaSpinner size={70} />
            );
          }
          return null;
        })()}

        {(() => {
          if (productsState == 1) {
            return (
              <ProductsNotFound btnType="GoForMarchaBtn" />            
            );
          }
          return null;
        })()}

        {(() => {
          if (productsState == 2) {
            return (
              <View style={{ flex: 1 }}>
                <PagerView style={styles.viewPager} initialPage={0}>
                  
                  <View style={styles.page} key="1">
                    <Text>First page {pid}</Text>
                    <Text>Swipe ➡️</Text>
                  </View>
                  
                  <View style={styles.page} key="2">
                    <Text>Second page {pid}</Text>
                  </View>
                  
                  <View style={styles.page} key="3">
                    <Text>Third page {pid}</Text>
                  </View>


                </PagerView>
              </View>
            );
          }
          return null;
        })()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});
