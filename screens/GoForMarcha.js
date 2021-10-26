import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
//import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
//import PagerView from "react-native-pager-view";

import PagerLoader from "../components/PagerLoader";
import ProductsNotFound from "../components/ProductsNotFound";
import ProductPager from "../components/ProductPager";

import StyleOf from "../assets/AppStyles";

export default function GoForMarcha() {



  const [productsState, setProductsState] = useState(0);
  const [dataList, setDataList] = useState(false);


  const pid = global.myProductSelectedId;
  const data = { api_token: global.token, user_id: global.uid, product_ids: pid, };
  useEffect(() => {
    fetch(global.api + 'go_for_marcha', {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {        
        var status = json.status.toLowerCase();
        if (status == "success" && json.result.length>0) {
          setDataList(json.result);
          setProductsState(2);
        } else {
          setProductsState(1);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      return () => {
        // Anything in here is fired on component unmount.
      }
  }, []);

  return (
    <View style={StyleOf.fullContainer}>
      {/* <ScreenHeader title="Available Products For Marcha" /> */}
      <View style={[StyleOf.containerInner]}>
        {(() => {
          if (productsState == 0) {
            return <PagerLoader />;
          }
          return null;
        })()}

        {(() => {
          if (productsState == 1) {
            return <ProductsNotFound btnType="GoBackToMyProducts" />;
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
