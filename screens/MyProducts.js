import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import ScreenSubTitleHeader from "../components/ScreenSubTitleHeader";
import BottomLinks from "../components/BottomLinks";
// import CardContentLoader from "../components/CardContentLoader";
import MyProductsCard from "../components/MyProductsCard";

//import goForMarchaBtn from '../assets/svg/goForMarchaBtn.svg';
// import ProductsNotFound from "../components/ProductsNotFound";

// const numColumns = 2;

// const WIDTH = Dimensions.get("window").width;

export default function MyProducts({ navigation, route }) {

  const {fullContainer, containerInner}=StyleOf;

  const [myProductsState, setMyProductsState] = useState(true);
  const [dataList, setDataList] = useState(route?.params?.products || []);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => getData(), []);

  const getData = () => {
    setMyProductsState(true);
    getProducts()
      .then((res) => {
        setDataList(res);
        setShowBtn(true);
        setMyProductsState(false);
      })
      .catch((err) => setMyProductsState(false));
  };

  const nowGoForMarcha = () => {
    if (global.myProductSelectedId < 1) {
      alert("Please select product first by touch on prduct image.");
    } else {
      navigation.navigate("GoForMarcha");
    }
  };

  return (
    <View style={fullContainer}>
      <ScreenHeader title="My Products" />
      <View style={[containerInner]}>
          {showBtn == true && <ScreenSubTitleHeader title="Select product to start Marcha" />}
          
          <MyProductsCard
            data={dataList}
            refresh={myProductsState}
            onRefresh={getData}
          />
        {showBtn == true && <TouchableOpacity
                              onPress={nowGoForMarcha}
                              style={[{ alignSelf: "center", padding: 10,marginBottom:15 }]}
                            >
                              <Image source={require("../assets/go_for_marcha_btn.png")} /> 
                            </TouchableOpacity>
        }                  
      </View>
      <BottomLinks active="BottomLinks" />
    </View>
  );
}
