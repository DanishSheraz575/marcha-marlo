import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import ScreenSubTitleHeader from '../components/ScreenSubTitleHeader';
import BottomLinks from "../components/BottomLinks";
import MarchaSpinner from "../components/MarchaSpinner";
import MyProductsCard from "../components/MyProductsCard";
import ProductsNotFound from "../components/ProductsNotFound";


const numColumns = 2;

const WIDTH = Dimensions.get("window").width;

export default function MyProducts({ navigation }) {
  const [myProductsState, setMyProductsState] = useState(0);
  //const [productId, setProductId] = useState(0);
  const [dataList, setDataList] = useState(false);

  const data = { api_token: global.token, user_id: global.uid };
  useEffect(() => {
    global.myProductSelectedId =0;
    fetch(global.api + "my_products", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        const status = json.status.toLowerCase() ;
        if (status == "success" && json.result.length>0) {
          let myProductList = [];

          json.result.forEach((item) => {
            let images = item.images.split(",");
            let img = item.product_images_base_url + images[0];
            myProductList.push({
              id: item.product_id,
              image: img,
              value: item.value,
              title: item.title,
              location: item.location,
            });
          });
          setDataList(myProductList.reverse());
          setMyProductsState(2);
        } else {
          setMyProductsState(1);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function nowGoForMarcha() {
    if(global.myProductSelectedId<1){
      alert("Please select product first by touch on prduct image.");
    }else{
      navigation.navigate('GoForMarcha');
    }
  }

  return (
    <View style={StyleOf.fullContainer}>
      <ScreenHeader title="My Products" />
      <View style={[StyleOf.containerInner,{marginBottom:80}]}>
        {(() => {
          if (myProductsState == 0) {
            return (
                <MarchaSpinner size={70} />
            );
          }
          return null;
        })()}

        {(() => {
          if (myProductsState == 1) {
            return (
              <ProductsNotFound btnType= "MyProductBtn" />
            );            
          }
          return null;
        })()}

        {(() => {
          if (myProductsState == 2) {
            return (
              <View style={[{ marginBottom: 60 }]}>

                <ScreenSubTitleHeader title="Select product to start Marcha" />

                <MyProductsCard data={dataList} />

                <TouchableOpacity
                  onPress={nowGoForMarcha}
                  style={[{ alignSelf: "center" }]}
                >
                  <Image source={require("../assets/go_for_marcha_btn.png")} />
                </TouchableOpacity>
              </View>
            );
          }
          return null;
        })()}
      </View>
      <BottomLinks active="BottomLinks" />
    </View>
  );
}
