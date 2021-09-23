import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import MarchaSpinner from "../components/MarchaSpinner";
import ProductsNotFound from "../components/ProductsNotFound";
import BottomLinks from "../components/BottomLinks";

export default function MarchaPendingRequests({}) {
  const navigation = useNavigation();
  const [myProductsState, setMyProductsState] = useState(0);
  const [dataList, setDataList] = useState(false);

  const data = { api_token: global.token, user_id: global.uid };
  useEffect(() => {
    fetch(global.api + "get_marcha_requests_sent", {
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
          let myProductList = [];
          json.result.forEach((item) => {
            let images = item.requested_product.images.split(",");
            let img = global.product_images_base_url + images[0];
            myProductList.push({
              requested_username: item.requested_username,
              requested_product_title: item.requested_product.title,
              requested_product_value: item.requested_product.value,
              requested_product_location: item.requested_product.location,
              requested_product_condition: item.requested_product.condition,
              requested_product_image: img,
              marcha_against_product_title: item.requester_product.title,
              marcha_request_id: item.request_id,
              marcha_date: item.dated,
            });
          });
          setDataList(myProductList);
          setMyProductsState(2);
        } else {
          setMyProductsState(1);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function cancelMarchaRequest(id){

    const data = { api_token: global.token, user_id: global.uid, request_id:id };
    fetch(global.api + "cancel_marcha", {
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
          navigation.navigate("Dashboard");
        } else {
          alert(json.result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  }

  function renderRequestBox({ item }) {
    return (
      <View style={{ margin: 20 }}>
        <View
          style={{
            marginHorizontal: 10,
            paddingVertical: 6,
            paddingHorizontal: 10,
            backgroundColor: "#EBEBEB",
            borderTopEndRadius: 10,
            borderTopStartRadius: 10,
          }}
        >
          <Text style={{ alignSelf: "center" }}>
            <Text style={{ color: "#818181" }}>Request sent to </Text>
            <Text
              style={{ color: "#000000", fontWeight: "bold", fontSize: 22 }}
            >
              {item.requested_username}
            </Text>
          </Text>
        </View>

        <View
          style={{ borderRadius: 15, backgroundColor: "#ffffff", padding: 20 }}
        >
          <View style={styles.rowContainer}>
            <View style={styles.colSmall}>
              <Image
                style={{
                  height: 100,
                  width: "100%",
                  borderColor: "#EFEFEF",
                  borderWidth: 2,
                  marginBottom: 10,
                }}
                source={{ uri: item.requested_product_image }}
              />
              <Text
                style={{
                  padding: 5,
                  fontSize: 9,
                  backgroundColor: "#EBEBEB",
                  alignSelf: "center",
                }}
              >
                <Image source={require("../assets/clock-icon.png")} />
                {item.marcha_date}
              </Text>
            </View>

            <View style={styles.colLarge}>
              <Text style={{ fontSize: 20, marginBottom: 5 }}>
                {item.requested_product_title}
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
              >
                Marcha Price: {item.requested_product_value}
              </Text>
              <View style={[styles.rowContainer, { marginBottom: 5 }]}>
                <View style={styles.colHalf}>
                  <Text>
                    <Image source={require("../assets/location-icon2.png")} />{" "}
                    {item.requested_product_location}
                  </Text>
                </View>
                <View style={styles.colHalf}>
                  <Text>Condition: {item.requested_product_condition}</Text>
                </View>
              </View>
              <View
                style={{
                  padding: 10,
                  backgroundColor: "#EBEBEB",
                  marginBottom: 10,
                  borderRadius: 6,
                }}
              >
                <Text>Marcha against:</Text>
                <Text style={{ fontWeight: "bold" }}>
                  {item.marcha_against_product_title}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => cancelMarchaRequest(item.marcha_request_id)}
                style={{
                  padding: 10,
                  backgroundColor: "#C5C5C5",
                  borderRadius: 6,
                }}
              >
                <Text style={{ alignSelf: "center", color: "#ffffff" }}>
                  <Image source={require("../assets/cross-icon.png")} />
                  CANCEL
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={StyleOf.fullContainer}>
      <ScreenHeader title="Marcha Pending Requests" backbtn="0" />

      <View style={[StyleOf.containerInner]}>
        {(() => {
          if (myProductsState == 0) {
            return <MarchaSpinner size={70} />;
          }
          return null;
        })()}

        {(() => {
          if (myProductsState == 1) {
            return <ProductsNotFound btnType="BackToDashboard" />;
          }
          return null;
        })()}

        {(() => {
          if (myProductsState == 2) {
            return <FlatList data={dataList} renderItem={renderRequestBox} />;
          }
          return null;
        })()}
      </View>

      <BottomLinks active="" />
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start", // if you want to fill rows left to right
  },
  colSmall: {
    width: "39%", // is 50% of container width
    marginRight: "1%",
  },
  colLarge: {
    width: "59%", // is 50% of container width
    marginLeft: "1%",
  },
  colHalf: {
    width: "50%", // is 50% of container width
  },
});
