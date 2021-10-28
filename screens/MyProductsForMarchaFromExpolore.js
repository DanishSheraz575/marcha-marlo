import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import ScreenSubTitleHeader from '../components/ScreenSubTitleHeader';
import BottomLinks from "../components/BottomLinks";
import MarchaSpinner from "../components/MarchaSpinner";
import CardContentLoader from "../components/CardContentLoader";
import MyProductsCardFromExplore from "../components/MyProductsCardFromExplore";
import ProductsNotFound from "../components/ProductsNotFound";


const numColumns = 2;

const WIDTH = Dimensions.get("window").width;

export default function MyProductsForMarchaFromExpolore({ navigation }) {

  const [myProductsState, setMyProductsState] = useState(0);
  const [dataList, setDataList] = useState(false);

  const data = { api_token: global.token, user_id: global.uid };
  useEffect(() => {
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

      //alert('my Product ID '+global.myProductSelectedId);
      //alert('my Product value '+global.myProductSelectedValue);

      //alert('marcha ID '+global.marcha_product_id);
      //alert('marcha value '+global.marcha_product_value);


      if(global.marcha_product_value>global.myProductSelectedValue){
        navigation.navigate("PayTheDifference");
      }else{
        const data = {
          api_token: global.token,
          user_id: global.uid,
          product_ids: global.myProductSelectedId,
          marcha_product_id: global.marcha_product_id,
        };
        fetch(global.api + "send_marcha_request", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((json) => {
            const status = json.status.toLowerCase();
            if (status == "success") {
              alert(json.result);
              navigation.navigate("MarchaPendingRequests");
            } else {
              alert(json.result);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }

      //navigation.navigate('GoForMarcha');
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
              <ProductsNotFound btnType= "Back" />
            );            
          }
          return null;
        })()}

        {(() => {
          if (myProductsState == 2) {
            return (
              <View style={[{ marginBottom: 5 }]}>

                <MyProductsCardFromExplore data={dataList} />

                <TouchableOpacity
                  onPress={()=>nowGoForMarcha()}
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
