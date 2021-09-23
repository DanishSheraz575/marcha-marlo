import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import MarchaSpinner from "../components/MarchaSpinner";
import RequestsNotFound from "../components/RequestsNotFound";
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

  function cancelMarchaRequest(id) {
    const data = {
      api_token: global.token,
      user_id: global.uid,
      request_id: id,
    };
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
      <View key={item.marcha_request_id}  style={StyleOf.requestBox}>
        <View style={StyleOf.rbHeader}>
          <Text style={StyleOf.selfCenter}>
            <Text style={StyleOf.textGray}>Request sent to </Text>
            <Text style={StyleOf.rbHeaderBold}>
              {item.requested_username}
            </Text>
          </Text>
        </View>

        <View style={StyleOf.rbBody}>
          <View style={StyleOf.colContainerRow}>
            <View style={[StyleOf.col,StyleOf.col4]}>
              <Image
                style={StyleOf.rbBodyImg}
                source={{ uri: item.requested_product_image }}
              />
              <Text style={StyleOf.rbBodyDate}>
                <Image source={require("../assets/clock-icon.png")} />
                {item.marcha_date}
              </Text>
            </View>

            <View style={[StyleOf.col,StyleOf.col6]}>
              <Text style={[StyleOf.rbBodyProductTitle]}>
                {item.requested_product_title}
              </Text>
              <Text style={StyleOf.rbBodyProductPrice}>
                Marcha Price: {item.requested_product_value}
              </Text>
              <View style={[StyleOf.colContainerRow,StyleOf.mb5]}>
                <View style={StyleOf.col5}>
                  <Text>
                    <Image source={require("../assets/location-icon2.png")} />{" "}
                    {item.requested_product_location}
                  </Text>
                </View>
                <View style={StyleOf.col5}>
                  <Text>Condition: {item.requested_product_condition}</Text>
                </View>
              </View>
              <View style={StyleOf.rbBodyMarchaAgainstBox}>
                <Text>Marcha against:</Text>
                <Text style={StyleOf.fwBold}>
                  {item.marcha_against_product_title}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => cancelMarchaRequest(item.marcha_request_id)}
                style={StyleOf.rbBodyBtnLight}
              >
                <Text style={[StyleOf.selfCenter, StyleOf.textWhite]}>
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
            return <RequestsNotFound btnType="BackToDashboard" />;
          }
          return null;
        })()}

        {(() => {
          if (myProductsState == 2) {
            return <FlatList data={dataList} renderItem={renderRequestBox} keyExtractor={(item, index) => index.toString()} />;
          }
          return null;
        })()}
      </View>

      <BottomLinks active="" />
    </View>
  );
}
