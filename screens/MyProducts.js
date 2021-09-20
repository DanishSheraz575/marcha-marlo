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
import ExploreMyProductsCard from "../components/ExploreMyProductsCard";

const numColumns = 2;
const WIDTH = Dimensions.get("window").width;

export default function MyProducts({ navigation }) {
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
        if (json.status == "Success") {
          let myProductList = [];

          json.products.forEach((item) => {
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
          setDataList(myProductList);

          //setDataList(json.products);
          setMyProductsState(2);
        } else {
          setMyProductsState(1);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <View style={StyleOf.fullContainer}>
      <ScreenHeader title="My Products" />
      <View style={[StyleOf.containerInner, { paddingBottom: 80 }]}>
        {(() => {
          if (myProductsState == 0) {
            return (
              <View style={StyleOf.rowItemCenter}>
                <MarchaSpinner size={70} />
              </View>
            );
          }
          return null;
        })()}

        {(() => {
          if (myProductsState == 1) {
            return (
              <View style={StyleOf.rowItemCenter}>
                <Text
                  style={{
                    fontSize: 42,
                    fontWeight: "bold",
                    marginBottom: 30,
                    textAlign: "center",
                  }}
                >
                  AWW !!
                </Text>
                <Image source={require("../assets/oh.png")} />
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    marginVertical: 20,
                    textAlign: "center",
                  }}
                >
                  No products found
                </Text>

                <TouchableOpacity
                  style={[
                    StyleOf.btn,
                    StyleOf.dropShadow,
                    StyleOf.bgEminence,
                    { marginTop: 40 },
                  ]}
                  onPress={() => navigation.navigate("AddProduct")}
                >
                  <Text style={StyleOf.btnLabel}>add product now!</Text>
                </TouchableOpacity>
              </View>
            );
          }
          return null;
        })()}

        {(() => {
          if (myProductsState == 2) {
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

                <ExploreMyProductsCard data={dataList} checkbox={true} />

                <TouchableOpacity style={[{alignSelf:'center'}]}>
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
