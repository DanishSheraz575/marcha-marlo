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
import ScreenSubTitleHeader from "../components/ScreenSubTitleHeader";
import BottomLinks from "../components/BottomLinks";
import MarchaSpinner from "../components/MarchaSpinner";
import CardContentLoader from "../components/CardContentLoader";
import ProductsNotFound from "../components/ProductsNotFound";
import ExploreProductsCard from "../components/ExploreProductsCard";

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
        if (status == "success" && json.result.length>0) {
          setDataList(json.result.reverse());
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

/*
  function nowGoForMarcha() {
    if(global.marcha_product_id<1){
      alert("Please select product first by touch on prduct image.");
    }else{
      navigation.navigate('GoForMarcha');
    }
  }
*/  

  return (
    <View style={StyleOf.fullContainer}>
      <ScreenHeader title="Explore Products" />
      <View style={[StyleOf.containerInner]}>
        {(() => {
          if (productsState == 0) {
            return (
              <CardContentLoader />
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
              <View >
                <ExploreProductsCard data={dataList} />              
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
