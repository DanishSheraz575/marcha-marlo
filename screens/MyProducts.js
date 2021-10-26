import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import ScreenSubTitleHeader from '../components/ScreenSubTitleHeader';
import BottomLinks from "../components/BottomLinks";
import MarchaSpinner from "../components/MarchaSpinner";
import CardContentLoader from "../components/CardContentLoader";
import MyProductsCard from "../components/MyProductsCard";
import ProductsNotFound from "../components/ProductsNotFound";


const numColumns = 2;

const WIDTH = Dimensions.get("window").width;

export default function MyProducts({ navigation }) {

  const [myProductsState, setMyProductsState] = useState(0);
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
          setDataList(json.result.reverse());
          setMyProductsState(2);
        } else {
          setMyProductsState(1);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      return () => {
        // Anything in here is fired on component unmount.
      }
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
              <CardContentLoader />
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
                  style={[{ alignSelf: "center",padding:10 }]}
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
